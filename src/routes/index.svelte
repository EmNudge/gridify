<script>
  import Grid from '../sections/Grid.svelte';
  import SplitTab from '../sections/Tabs/SplitTab.svelte';

  import '../app.css';
</script>

<main>
  <h1>Gridify</h1>
  <SplitTab />
  <br>
  <Grid />
</main>

<style>
  h1 {
    text-align: left;
    margin-bottom: 5px;
  }
  main {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    margin: 0 auto;
    max-width: 800px;
  }
</style>