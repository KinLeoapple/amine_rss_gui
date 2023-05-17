<template>
    <div ref="btn">
        <i v-bind:class=this.classVal></i>
    </div>
</template>

<script>
export default {
    name: "ItemBtn",
    props: {
        classVal: String
    },
    mounted() {
        this.$nextTick(() => {
            let btn = this.$refs.btn;
            let currentClassVal = this.classVal;
            btn.onclick = () => {
                [].forEach.call(btn.parentNode.children, item => {
                    let dom = item.querySelector('i');
                    if (dom !== null) {
                        let classVal = dom.getAttribute('class').trim();

                        if (classVal !== currentClassVal) {
                            item.style.background = 'transparent';
                            item.style.marginLeft = '0';
                            item.style.borderRadius = '10px';
                            dom.removeAttribute('style');
                        } else {
                            setTimeout(() => {
                                item.style.borderRadius = '0 10px 10px 0';
                            }, 100);
                            item.style.background = '#2c3e50';
                            item.style.marginLeft = '-20px';
                            dom.style.color = 'white';
                        }
                    }
                });
            }
        });
    }
}
</script>

<style scoped>
:is(div) {
    min-width: 100px;
    max-width: 100px;
    min-height: 30px;
    max-height: 30px;
    line-height: 30px;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .1s linear;
    border-left: transparent 1px solid;
    flex-shrink: 0;
    border-radius: 10px;
}

:is(i) {
    font-size: 26px;
    color: #2c3e50;
}

:is(i:hover) {
    color: #2c3e50;
}
</style>