import os
import sys
import cv2
import json
import time
import rotoscope
import numpy as np

from PIL import Image
from subprocess import call

# change working directory to here
os.chdir(os.path.dirname(os.path.realpath(__file__)))


#
text = sys.argv[1]
location = sys.argv[2]
jsonPath = os.path.join("./frames/", 'frames.json')

# Load frames
frames = json.load(open(jsonPath))

# Used to compute motion blur
lastCorners = None

# Create text image
# text = np.zeros(textSize, dtype=np.uint8)
# text = cv2.imread('text.png')
# text = Image.new('RGB', (100, 80), (255,255,255))
textImage = rotoscope.generateText(text)

# Current time
timeStart = int(time.time() * 1000)

# Will store all gif frames
frameImages = []

# Iterate trough frames
for frame in frames:
	# Load image
	name = frame['file']
	filePath = os.path.join("./frames", name)
	finalFrame = None

	# If it has transformations,
	# process with opencv and convert back to pillow
	if frame['show'] == True:
		image = cv2.imread(filePath)

		# Do rotoscope
		image = rotoscope.rotoscope(image, textImage, frame)

		# Show final result
		# cv2.imshow(name, image)
		finalFrame = rotoscope.cvImageToPillow(image)
	else:
		finalFrame = Image.open(filePath)

	frameImages.append(finalFrame)

# Saving...
frameImages[0].save(location, save_all=True, append_images=frameImages, loop=0)
