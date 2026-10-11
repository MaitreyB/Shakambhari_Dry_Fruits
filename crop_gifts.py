from PIL import Image
import os

img_path = 'public/assets/Shakambhari Dry Fruits and Foods - Thoughtful Gifting 1.jpeg'
out_dir = 'public/assets/gifting'
os.makedirs(out_dir, exist_ok=True)

try:
    img = Image.open(img_path)
    w, h = img.size

    cw = w // 2
    ch = h // 3

    count = 1
    for row in range(3):
        for col in range(2):
            box = (col * cw, row * ch, (col + 1) * cw, (row + 1) * ch)
            cropped = img.crop(box)
            cropped.save(f'{out_dir}/gift{count}.jpeg')
            count += 1
    print("Successfully cropped gifting images.")
except Exception as e:
    print("Error:", e)
