function getSvgText(svgEl: SVGElement) {
	const xml = new XMLSerializer().serializeToString(svgEl);
	return `data:image/svg+xml;base64,${btoa(xml)}`;
}

export function downloadItem(itemText: string, fileName = 'download') {
	const a = document.createElement('a');
	a.setAttribute('href', itemText);
	a.setAttribute('download', fileName);

	a.style.display = 'none';
	document.body.appendChild(a);

	a.click();

	document.body.removeChild(a);
}

const sleep = (miliseconds: number) => 
  new Promise(resolve => setTimeout(resolve, miliseconds));

export async function downloadPNG(svgEl: SVGElement) {
	const img = document.createElement('img');
	img.src = getSvgText(svgEl);
	document.body.appendChild(img);
	await sleep(100);

	const width = parseInt(window.getComputedStyle(img).width);
	const height = parseInt(window.getComputedStyle(img).height);

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	document.body.appendChild(canvas);
	await sleep(100);

	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);

	const imageText = canvas
		.toDataURL('image/png')
		.replace('image/png', 'image/octet-stream');
		
	downloadItem(imageText, 'gridify_grid.png');

	document.body.removeChild(img);
	document.body.removeChild(canvas);
}

export function downloadSVG(svgEl: SVGElement) {
	const itemText = getSvgText(svgEl);
	console.log({ itemText })
	downloadItem(itemText, 'gridify_grid.svg');
}