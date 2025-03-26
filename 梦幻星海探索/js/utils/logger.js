// 日志最大行数
const MAX_LOG_LINES = 100;
let logLines = [];

// 添加日志
function log(message) {
    console.log(message);
    
    // 添加到日志数组
    const timestamp = new Date().toLocaleTimeString();
    logLines.push(`[${timestamp}] ${message}`);
    
    // 保持日志行数不超过最大值
    if (logLines.length > MAX_LOG_LINES) {
        logLines.shift();
    }
    
    // 更新UI（如果有控制台元素）
    updateConsoleUI();
}

// 清空日志
function clearLog() {
    logLines = [];
    updateConsoleUI();
}

// 更新控制台UI
function updateConsoleUI() {
    const consoleElement = document.getElementById('console');
    if (consoleElement) {
        consoleElement.innerHTML = logLines.join('<br>');
        
        // 滚动到底部
        consoleElement.scrollTop = consoleElement.scrollHeight;
    }
}

// 添加调试函数，用于调试对象
function logObject(label, object) {
    try {
        log(`${label}: ${JSON.stringify(object)}`);
    } catch (e) {
        log(`${label}: [无法序列化的对象]`);
    }
}

// 初始日志
log('日志系统初始化完成');