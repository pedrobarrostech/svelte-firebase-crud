<script>
    import { db } from "../configs/firebase.js";
  
    let task = {
      name: "",
      description: "",
    };
  
    let tasks = [];
    let inputElement;
  
    let editStatus = false;
    let currentId = "";
  
    db.collection("tasks")
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        tasks = [...docs];
        console.log(tasks);
      });
  
    const addTask = async () => {
      try {
        await db
          .collection("tasks")
          .doc()
          .set({ ...task, createdAt: Date.now() });
        console.log("new Task created");
      } catch (error) {
        console.error(error);
      }
    };
  
    const deleteTask = async (id) => {
      await db.collection("tasks").doc(id).delete();
    };
  
    const editTask = (currenTask) => {
      currentId = currenTask.id;
      task.name = currenTask.name;
      task.description = currenTask.description;
  
      editStatus = true;
    };
  
    const updateTask = async () => {
      await db.collection("tasks").doc(currentId).update(task);
      console.log("Product Updated Successfully");
    };
  
    const handleSubmit = () => {
      if (!task.name) return;
  
      if (!editStatus) {
        addTask();
      } else {
        updateTask();
        editStatus = false;
        currentId = "";
      }
  
      task = { name: "", description: "" };
      inputElement.focus();
    };
  
    const onCancel = () => {
      editStatus = false;
      currentId = "";
      task = { name: "", description: "" };
    };
</script>
  
<div class="container p-4">
    <div class="row">
        <div class="col-md-4 offset-md-4">
        {#each tasks as task}
            <div class="card card-body mt-2">
            <div class="d-flex justify-content-between">
                <h5>{task.name}</h5>
                <i
                class="material-icons"
                style="vertical-align:middle;"
                on:click={editTask(task)}>
                edit
                </i>
            </div>
            <p>{task.description}</p>
            <div>
                <button on:click={deleteTask(task.id)} class="btn btn-danger">
                <i class="material-icons" style="vertical-align:middle;">
                    delete_forever
                </i>
                <span style="vertical-align:middle;">Delete</span>
                </button>
            </div>
            </div>
        {/each}
        </div>
    </div>
</div>
