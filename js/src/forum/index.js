app.initializers.add('qx-css/anniu', function(app) {
    // 定义一个函数来创建我们的按钮
    function createButton() {
        // 创建按钮元素
        const button = document.createElement('button');
        button.id = 'anniu-hello-btn';
        button.innerHTML = 'Hello!';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.padding = '10px 20px';
        button.style.backgroundColor = '#3d7ea6';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = '9999';
        button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

        // 添加一个点击事件作为演示
        button.addEventListener('click', function() {
            alert('The switch is ON! This button is visible because you enabled the Anniu extension.');
        });

        // 将按钮添加到页面 body
        document.body.appendChild(button);
        console.log('Anniu: Button created (switch is ON).');
    }

    // 定义一个函数来移除按钮
    function removeButton() {
        const existingButton = document.getElementById('anniu-hello-btn');
        if (existingButton) {
            existingButton.remove();
            console.log('Anniu: Button removed (switch is OFF).');
        }
    }

    // 初始检查：从页面负载中获取开关状态
    const isEnabled = app.forum.attribute('anniuEnabled') || false;

    if (isEnabled) {
        // 如果启用，创建按钮
        createButton();
    }

    // 监听设置变化（当管理员在后台切换开关时）
    // 注意：此功能在Flarum中可能需要刷新页面才能完全生效，这是一个简化的实现。
    const observer = new MutationObserver(function(mutations) {
        // 这里可以添加更精细的DOM变化检测，但为了简单，我们主要依赖页面刷新。
    });

    // 开始观察body的子节点变化（简化处理）
    observer.observe(document.body, { childList: true, subtree: true });

    // 提供一个简单的控制台日志
    console.log(`Anniu extension loaded. Switch is currently: ${isEnabled ? 'ON' : 'OFF'}`);
});