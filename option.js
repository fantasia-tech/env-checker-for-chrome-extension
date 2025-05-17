const appendOptionFnc = () => {
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const hostName = document.getElementById('host-name').value;
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    chrome.storage.sync.get(['items']).then(
        (result) => {
            let items = result.items;
            items.push({ name: name, type: type, hostName: hostName, bgColor: bgColor, textColor: textColor });
            chrome.storage.sync.set(
                {items: items},
                () => { restoreOptions(); }
            )
        }
    );
};
const resetOptionFnc = () => {
    if(window.confirm('Are you reset all options?')){
        let defaultOptions = {items: [
            {name: 'Develop', type: 'eq', hostName: 'localhost', bgColor: '#ee0000', textColor: '#ffffff'},
            {name: 'Staging', type: 'regexp', hostName: '\\.local$', bgColor: '#ee8800', textColor: '#ffffff'},
            {name: 'Production', type: 'eq', hostName: 'github.com', bgColor: '#0099ff', textColor: '#ffffff'},
        ]};
        chrome.storage.sync.set(defaultOptions, () => { restoreOptions(); });
    }
};

const upTarget = (n) => {
    chrome.storage.sync.get(['items']).then(
        (result) => {
            let items = result.items;
            if(n != 0) {
                let upItem = items[n];
                let downItem = items[n - 1];
                items[n] = downItem;
                items[n - 1] = upItem;
                chrome.storage.sync.set({items: items}, () => { restoreOptions(); });
            }
        }
    );
};

const downTarget = (n) => {
    chrome.storage.sync.get(['items']).then(
        (result) => {
            let items = result.items;
            if(n < items.length - 1) {
                let downItem = items[n];
                let upItem = items[n + 1];
                items[n + 1] = downItem;
                items[n] = upItem;
                chrome.storage.sync.set({items: items}, () => { restoreOptions(); });
            }
        }
    );
};

const deleteTarget = (n) => {
    chrome.storage.sync.get(['items']).then(
        (result) => {
            let items = result.items;
            items.splice(n, 1);
            chrome.storage.sync.set({items: items}, () => { restoreOptions(); });
        }
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get(['items']).then(
        (result) => {
            let items = result.items;
            const options = document.getElementById('options');
            options.innerHTML = '';
            for(let i = 0; i < items.length; i++) {
                const item = items[i];
                let tr = document.createElement('tr');
                let th = document.createElement('th');
                th.innerText = i + 1;
                let td = document.createElement('td');
                td.style.backgroundColor = item.bgColor;
                td.style.color = item.textColor;
                td.innerText = `${item.name} ${item.type} ${item.hostName}`;
                let upTd = document.createElement('td');
                let upBtn = document.createElement('button');
                upBtn.innerText = '↑';
                upBtn.onclick = upTarget.bind(upBtn, i);
                upTd.append(upBtn);
                let downTd = document.createElement('td');
                let downBtn = document.createElement('button');
                downBtn.innerText = '↓';
                downBtn.onclick = downTarget.bind(downBtn, i);
                downTd.append(downBtn);
                let delTd = document.createElement('td');
                let delBtn = document.createElement('button');
                delBtn.innerText = 'Delete';
                delBtn.onclick = deleteTarget.bind(delBtn, i);
                delTd.append(delBtn);
                tr.append(th);
                tr.append(td);
                tr.append(upTd);
                tr.append(downTd);
                tr.append(delTd);
                options.append(tr);
            }
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('appendBtn').addEventListener('click', appendOptionFnc);
document.getElementById('resetBtn').addEventListener('click', resetOptionFnc);
