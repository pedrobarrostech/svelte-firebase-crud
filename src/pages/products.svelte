<script>
  
  import { addProduct, deleteProduct, getAllProducts, updateProduct } from '../services/products.js';

  let product = {
    name: '',
    description: '',
  };

  let products = [];
  let inputElement;

  let editStatus = false;
  let currentId = '';

  getAllProducts((querySnapshot) => {
    let docs = [];
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });
    products = [...docs];
  });


  const addProductAction = async () => {
    try {
      await addProduct(product);
      console.log('new Product created');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductAction = async (id) => {
    deleteProduct(id);
  };

  const editProductAction = (currentProduct) => {
    currentId = currentProduct.id;
    product.name = currentProduct.name;
    product.description = currentProduct.description;
    product.description = currentProduct.value;

    editStatus = true;
  };

  const updateProductAction = async () => {
    await updateProduct(currentId, product);
    console.log('Product Updated Successfully');
  };

  const handleSubmit = () => {
    if (!product.name) return;

    if (!editStatus) {
      addProductAction();
    } else {
      updateProductAction();
      editStatus = false;
      currentId = '';
    }

    product = { name: '', description: '' };
    inputElement.focus();
  };

  const onCancel = () => {
    editStatus = false;
    currentId = '';
    product = { name: '', description: '' };
  };
</script>

<div class="container p-4">
  <div class="row">
    <div class="col-md-4 offset-md-4">
      <h1>Produtos</h1>
      <form on:submit|preventDefault={handleSubmit} class="card card-body">
        <div class="form-group">
          <input
            type="text"
            bind:value={product.name}
            bind:this={inputElement}
            placeholder="Write a new Product"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <textarea
            bind:value={product.description}
            rows="3"
            placeholder="Write a Product Description"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <input
            type="text"
            bind:value={product.value}
            bind:this={inputElement}
            placeholder="Write a new Value"
            class="form-control"
          />
        </div>

        <div class="ml-auto mt-1">
          <button class="btn btn-primary">
            <i class="material-icons" style="vertical-align:middle;">save</i>
            <span style="vertical-align:middle">
              {#if !editStatus}Save{:else}Update{/if}
            </span>
          </button>
          {#if editStatus}<button on:click={onCancel} class="btn btn-info">Cancel</button>{/if}
        </div>
      </form>

      {#each products as product}
        <div class="card card-body mt-2">
          <div class="d-flex justify-content-between">
            <h5>{product.name}</h5>
            <i
              class="material-icons"
              style="vertical-align:middle;"
              on:click={editProductAction(product)}
            >
              edit
            </i>
          </div>
          <p>{product.description}</p>
          <div>
            <button on:click={deleteProductAction(product.id)} class="btn btn-danger">
              <i class="material-icons" style="vertical-align:middle;"> delete_forever </i>
              <span style="vertical-align:middle;">Delete</span>
            </button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
