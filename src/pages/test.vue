<template>
    <div class="test">
        123123
        <button onclick="getData">123</button>
    </div>

</template>

<script>
    export default {
        name: "test",
        data () {
        return {
            tableData: []
        }
        },
        // created(){
        //     this.getData();
        // },
        methods: {
            getData:function(event){
                this.$axios.get("https://www.zjutleo.cn/village/accurateSupport/apply/list")
                    .then(response => {
                        if(response.data.success){
                            console.log(response.data.data);
                            this.tableData = [];
                            this.tableData = response.data.data;
                        }
                        else
                        {
                            console.log("error");
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                        alert(error.message);
                    })
            }
        }
    }

</script>

<style scoped>
    .test {
        text-decoration: underline;
    }
</style>