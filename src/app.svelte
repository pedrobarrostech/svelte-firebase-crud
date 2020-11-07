
<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/home.svelte";
  import Orders from "./pages/orders.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="/">Home</Link>
    <Link to="pedidos">Pedidos</Link>
  </nav>
  <div>
    <Route path="/"><Home /></Route>
    <Route path="pedidos" component="{Orders}" />
  </div>
</Router>
