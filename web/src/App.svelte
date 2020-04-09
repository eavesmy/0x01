<script>
    export let name;
    import { onMount } from 'svelte';
    import { LPost } from './lib/net.js';
    import Modal from './components/Modal.svelte';
    
    const Titles = [ "预览", "名称", "大小", "类型","最后修改时间", "路径", "操作"];

    const Paths = {
        ASSERT_LIST : "/api/list",
        ASSERT_DEL: "/api/del",
        ASSERT_UPLOAD: "/api/upload",
        ASSERT_PREVIEW: "/api/preview"
    };

    let uploadBtn;
    let modal;

    let preview;
    let img;
    let filename;
    let type;

    let List = [
        {
            img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586409677470&di=e725123bced9cadb324094bddcb693d8&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201511%2F21%2F20151121171107_zMZcy.jpeg",
            title: "测试",
            size: "12kb",
            type: "jpeg",
            modify: "2019-11-11 00:00:00",
            path: "/test/123.jpeg"
        }
    ];

    onMount(async ()=>{
         await GetList();
    });

    async function GetList(){
         List = (await LPost(Paths.ASSERT_LIST)).data;
    }

    async function Del() {

        if(!confirm("确定删除？")) return

        const that = this;
        let id = that.getAttribute("data-id");
        let ret = await LPost(Paths.ASSERT_DEL,JSON.stringify({id}));

        alert("删除成功");

        await GetList();
    }

    async function Upload(){
        const that = this;
        let file = uploadBtn.files[0];

        if(!file) return

        var reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = async e => { 
            let ret = await LPost(Paths.ASSERT_UPLOAD,JSON.stringify({
                size: file.size,
                type: file.type,
                name: file.name,
                file: e.target.result
            }));
            if(ret.errno == 0) {
                alert("上传成功");
            }
            await GetList();
        };
    }

    async function PreUpload(){
        const that = this;
        let file = that.files[0];
        if(!file) return

        var reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = async e => { preview = e.target.result; };
    }

    async function Download(){
        const that = this;
    }

    async function ModalClose(){
        modal.className = "card is-hidden";
    }

    async function Preview(){
        const that = this;
        let id = that.getAttribute("data-id");
        let res = await LPost(Paths.ASSERT_PREVIEW,JSON.stringify({id}));
        img = res.data;

        filename = res.data.name;
        type = res.data.type;
        img = res.data.path;
    
        document.querySelector("#modal").className += " is-active";
    }

</script>

<main>
    <navbar class="navbar is-dark">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                {name}
            </a>
        </div>
    </navbar>
    <div class="content">
        <div class="container">
        <div class="content"></div>
        <div class="container">
            <input type="file" id="upload_file" bind:this={uploadBtn} on:change={PreUpload}>
            <button class="button is-success" on:click={Upload}>
                上传
            </button>
        </div>
        <div class="container">
            <img src="{preview}" alt="" width="200px">
        </div>
        <div class="content"></div>
        <div class="card">
            <table class="table is-fullwidth">
                <thead>
                    {#each Titles as item}
                        <th>{item}</th>
                    {/each}
                </thead>
                <tbody>
                    {#each List as item}
                        <tr>
                                <td>
                                    <img src="{item.img}" alt="" width=50px>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.size}</td>
                                <td>{item.type}</td>
                                <td>{item.modify}</td>
                                <td>{item.path}</td>
                                <td>
                                    <button class="button is-warning is-small" data-id={item._id} on:click={Del}>删除</button>
                                    <button class="button is-warning is-small" data-id={item._id} on:click={Preview}>预览</button>
                                </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        </div>
    </div>
    <Modal src={img} FileName={filename} bind:this={modal}/>
</main>

<style>
</style>
