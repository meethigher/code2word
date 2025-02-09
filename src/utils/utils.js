export const Utils = {
    home: "/",
    blog: "/blog/",
    github: "https://github.com/meethigher",
    printProjectInfo: () => {
        console.log("%c" +
            "@author：Kit Chen\n" +
            "@link：https://github.com/meethigher/code2word\n" +
            "@createDate：2025-02-09\n" +
            "@页面加载耗时：" + (performance.now() / 1000).toFixed(2) + "秒",
            "font-size:18px; font-weight:bold; color:#24a0f0;");
    },

    printAttention: () => {
        console.log("%c开发过程中注意事项:\n" +
            "1. Word支持通过HTML/RTF进行格式渲染\n" +
            "2. Word在按行渲染内容时，对于 ol>li、ul>li 比较友好\n" +
            "3. 剪切板一次复制，内部实际复制了多种格式内容。比如html/text等，可使用CopyQ进行提取\n" +
            "4. 注意浏览器与Word渲染的差异。就比如white-space: pre-wrap\n"+
            "5. Word渲染时使用内联样式，而鼠标选择复制时，浏览器会自动将其转为内联样式(虽然我在开发时直接就使用内联样式开发的，但是该结论我也验证过了)",
            "font-size:12px; font-weight:bold; color:black;")
    },

    usage: () => {
        alert("1. 复制高亮输出区的代码，然后保留原格式粘贴至Word\n" +
            "2. Word支持内部序号，并不支持外部序号\n" +
            "3. Word中可鼠标右键-调整列表缩进，进行布局美化\n")
    },

    showToast: (message) => {
        alert(message); // 这里可以替换为更复杂的 Toast 组件
    }
};
