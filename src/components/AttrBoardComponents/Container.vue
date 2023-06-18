<template>
  <div class="attr-board-container">
    <div class="attr-board-common-title">
      <span>布局</span>
    </div>
    <div class="attr-board-container-layouts">
      <div :class="{ 'active': widget.style === 0, disable: readonly }" @click="changeStyle(0)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M4 4h39v40H4zM47 4h39v40H47z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 1, disable: readonly }" @click="changeStyle(1)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M4 4h50v40H4zM58 4h28v40H58z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 2, disable: readonly }" @click="changeStyle(2)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M36 4h50v40H36zM4 4h28v40H4z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 3, disable: readonly }" @click="changeStyle(3)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M4 25h50v18H4zM58 25h28v18H58zM4 4h82v18H4z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 4, disable: readonly }" @click="changeStyle(4)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M36 25h50v18H36zM4 25h28v18H4zM4 4h82v18H4z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 5, disable: readonly }" @click="changeStyle(5)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M26 4h38v40H26zM4 4h18v40H4zM68 4h18v40H68z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 6, disable: readonly }" @click="changeStyle(6)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M4 4h24v40H4zM32 4h26v40H32zM62 4h24v40H62z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 7, disable: readonly }" @click="changeStyle(7)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M4 4h16v40H4zM24 4h16v40H24zM44 4h42v40H44z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 8, disable: readonly }" @click="changeStyle(8)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 91 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M4 4h16v40H4zM24 4h16v40H24zM44 4h42v40H44z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 9, disable: readonly }" @click="changeStyle(9)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 91 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M4 4h17.5v40H4zM25.5 4H43v40H25.5zM47 4h17.5v40H47zM68.5 4H86v40H68.5z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 10, disable: readonly }" @click="changeStyle(10)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 91 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><path fill="#DFE3E9" d="M21.2 4h13.2v40H21.2zM4 4h13.2v40H4zM38.4 4h13.2v40H38.4zM55.6 4h13.2v40H55.6zM72.8 4H86v40H72.8z"/></g></svg>
      </div>
      <div :class="{ 'active': widget.style === 11, disable: readonly }" @click="changeStyle(11)">
        <svg width="92" height="50" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(-1 0 0 1 91 1)" fill="none" fill-rule="evenodd"><rect stroke="#DFE3E9" fill="#FFF" width="90" height="48" rx="4"/><g fill="#DFE3E9"><path d="M32.6 4h10.3v40H32.6zM18.3 4h10.3v40H18.3zM4 4h10.3v40H4zM46.9 4h10.3v40H46.9zM61.2 4h10.3v40H61.2zM75.5 4h10.3v40H75.5z"/></g></g></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    widget: Object,
    readonly: Boolean,
    titleTip: String,
  },
  inheritAttrs: false,
  methods: {
    changeStyle(style) {
      if(this.readonly) return
      const lengths = [2,2,2,3,3,3,3,3,3,4,5,6]

      this.widget.children = this.widget.children.filter(({ floor }) => floor < lengths[style])

      this.widget.style = style
    },
  },
}
</script>

<style lang="scss">
.attr-board-container-layouts {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 10px;

  div {
    cursor: pointer;
    border-radius: 4px;
    box-sizing: border-box;
    width: 92px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      border: solid 1px #0c58d2;
    }
  }
}
</style>
