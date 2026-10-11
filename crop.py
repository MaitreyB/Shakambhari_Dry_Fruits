import os
from PIL import Image

assets_dir = "public/assets"
out_dir = "public/assets/cropped"
os.makedirs(out_dir, exist_ok=True)

for f in os.listdir(assets_dir):
    if not f.endswith(".jpeg"):
        continue
    
    # Don't crop gifting/hero images
    if "Gifting" in f or "Shakambhari Dry Fruits" in f:
        continue
        
    try:
        with Image.open(os.path.join(assets_dir, f)) as img:
            w, h = img.size
            if h > w: # Vertical (e.g. 853x1280)
                # Crop center square for vertical posters
                # The bowl is typically in the center. We use 60% of the width to be safe.
                size = int(w * 0.6)
                cx, cy = w // 2, h // 2
                cropped = img.crop((cx - size//2, cy - size//2 + 50, cx + size//2, cy + size//2 + 50))
            elif w > h: # Horizontal (e.g. 1280x700)
                # Crop left square
                size = h
                cropped = img.crop((0, 0, size, size))
            else: # Square (1024x1024)
                # Crop left 60%
                size = int(w * 0.65)
                cropped = img.crop((0, (h-size)//2, size, (h+size)//2))
            
            cropped.save(os.path.join(out_dir, f))
            print(f"Cropped {f}")
    except Exception as e:
        print(f"Error on {f}: {e}")
