const createEnvmarkFnc = (item) => {
    let envmark = document.createElement('div');
    envmark.style.backgroundColor = item.bgColor;
    envmark.style.color = item.textColor;
    envmark.style.position = 'fixed';
    envmark.style.width = '160px';
    envmark.style.textAlign = 'center';
    envmark.style.top = '35px';
    envmark.style.right = '-35px';
    envmark.style.zIndex = 9999999;
    envmark.style.padding = '5px 0';
    envmark.style.transform = "rotate(45deg)";
    envmark.style.lineHeight = "15px";
    envmark.style.fontSize = "15px";
    envmark.innerText = item.name;
    return envmark;
}; 
const loadEC4CE = () => {
    chrome.storage.sync.get(['items']).then(
        (result) => {
            let items = result.items;
            let envmark = null;
            for(let i = 0; i < items.length; i++) {
                const item = items[i];
                let currentHost = window.location.host;
                if (item.type === 'regexp') {
                    if(new RegExp(item.hostName).test(currentHost)) {
                        envmark = createEnvmarkFnc(item);                        
                    }
                } else { // type == eq
                    if(currentHost == item.hostName) {
                        envmark = createEnvmarkFnc(item);
                    }
                }
            }
            if(envmark != null) {
                document.body.append(envmark);
            }
        }
    );
};
loadEC4CE();
