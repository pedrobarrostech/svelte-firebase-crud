<script>
  import { deleteOrder, getAllOrders } from '../services/orders.js';

  let orders = [];

  getAllOrders((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    orders = [...docs];
  });

  const deleteOrderAction = async (id) => {
    await deleteOrder(id);
  };
</script>

<div class="container p-4">
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h1>Pedidos</h1>
      {#each orders as order}
        <div class="card card-body mt-2">
          <div class="d-flex justify-content-between">
            <h5>{order.phone}</h5>
          </div>
          <p>{order.total}</p>
          <div>
            <button on:click={deleteOrderAction(order.id)} class="btn btn-danger">
              <i class="material-icons" style="vertical-align:middle;"> delete_forever </i>
              <span style="vertical-align:middle;">Delete</span>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
