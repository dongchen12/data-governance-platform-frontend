import React, { useState } from 'react';
import { Input, Button, message } from 'antd';

const { TextArea } = Input;

const CodeExecution = () => {
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');

    const executeCode = () => {
        // 在这里将代码发送到后端执行，并获取结果
        // 假设这里是发送请求的函数 fetchCodeExecutionResult

        // 示例：假设后端接收到 code 并返回结果 result
        // 这里使用了 setTimeout 模拟异步请求
        message.loading({ content: '执行中...', key: 'execution' });
        setTimeout(() => {
            // 假设这里是从后端获取的结果
            const mockResult = `执行结果：${code}`;
            setResult(mockResult);
            message.success({ content: '执行完成', key: 'execution', duration: 2 });
        }, 2000);
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    return (
        <div>
            <TextArea
                placeholder="在此粘贴代码"
                value={code}
                onChange={handleCodeChange}
                autoSize={{ minRows: 6 }}
            />
            <Button type="primary" onClick={executeCode} style={{ marginTop: '10px' }}>
                执行代码
            </Button>
            <div style={{ marginTop: '20px' }}>
                <h3>执行结果：</h3>
                <div style={{ border: '1px solid #d9d9d9', padding: '10px' }}>{result}</div>
            </div>
        </div>
    );
};

export default CodeExecution;
