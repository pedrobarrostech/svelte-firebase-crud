<script>
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './pages/home.svelte';
  import Orders from './pages/orders.svelte';
  import Products from './pages/products.svelte';

  export let url = '';
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="pedidos">Pedidos</Link>
    <Link to="produtos">Produtos</Link>
  </nav>
  <div>
    <Route path="/" component={Home} />
    <Route path="pedidos" component={Orders} />
    <Route path="produtos" component={Products} />
  </div>
</Router>
