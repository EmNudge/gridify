<script lang="ts">
  import { downloadPNG, downloadSVG } from '../../utils/download';

  const download = (func: Function) => () => func(document.querySelector('svg'));
</script>

<button on:click={download(downloadSVG)}>Download As SVG</button>
<button on:click={download(downloadPNG)}>Download As PNG</button>

<p>Note: It's likely better to download as SVG and convert it yourself to another format, if necessary</p>
<p>SVG to PNG conversion the way this web app does it is not perfect and is often low resolution.</p>