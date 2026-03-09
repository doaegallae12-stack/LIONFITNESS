import os
from PIL import Image

def compress_images(source_dir, target_dir, quality=70):
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)

    image_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    
    for filename in os.listdir(source_dir):
        if filename.lower().endswith(image_extensions):
            source_path = os.path.join(source_dir, filename)
            target_path = os.path.join(target_dir, filename)
            
            # Skip if it's already in the target dir (though source and target are different here)
            if source_path == target_path:
                continue

            try:
                with Image.open(source_path) as img:
                    # Convert to RGB if saving as JPEG
                    if filename.lower().endswith(('.jpg', '.jpeg')) and img.mode != 'RGB':
                        img = img.convert('RGB')
                    
                    # Optimization for different formats
                    if filename.lower().endswith('.png'):
                        # For PNG, we can use reduce colors or just optimized saving
                        # But simpler is to convert to WebP or just save with optimization
                        img.save(target_path, optimize=True)
                    else:
                        img.save(target_path, quality=quality, optimize=True)
                        
                print(f"Compressed: {filename}")
            except Exception as e:
                print(f"Error compressing {filename}: {e}")

if __name__ == "__main__":
    source = "."
    target = "assets"
    compress_images(source, target)
