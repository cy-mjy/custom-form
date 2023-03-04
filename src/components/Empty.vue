<template>
  <div class="form-empty">
    <svg v-show="showIcon" width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="m21.976 7.063-3.16 13.624a.974.974 0 0 1-.47.666l-.084.049a.971.971 0 0 1-.674.111l-.175-.051-12.826-4.383-.075-.029a.936.936 0 0 1-.479-1.234c.091-.206.246-.379.442-.492l4.7-2.714-.09-.178C7.51 9.775 5.424 7.8 2.81 6.49a1.467 1.467 0 0 1 .21-2.71c5.758-1.835 10.17-.426 12.968 4.169l.324.541 4.207-2.429c.196-.113.423-.161.647-.137l.11.02a.934.934 0 0 1 .699 1.12Zm-2.36 1.725-3.976 2.296-1.281-2.142c-2.12-3.48-5.217-4.713-9.523-3.688l-.208.05.162.095C7.097 6.782 9 8.68 10.495 11.076l.233.383.056.102.92 1.795L7.2 15.954l9.962 3.405 2.453-10.571Z" fill="#8F959E" fill-rule="nonzero"/></svg>
    <span>{{ tip }}</span>
  </div>
</template>

<script>
  export default {
    props: {
      tip: {
        type: String,
        default: '请选择左侧控件拖动至此处',
      },
      showIcon: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>

<style lang="scss">
.form-empty {
  flex: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #8F959E;
  font-size: 14px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  pointer-events: none;
}
</style>
