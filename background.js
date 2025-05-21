const createEnvmarkFnc = (item, global) => {
    const envmark = document.createElement('div');
    const uuid = crypto.randomUUID();
    const labelID = `label-ec4ce-${uuid}`;
    envmark.id = labelID;
    envmark.style.backgroundColor = item.bgColor;
    envmark.style.color = item.textColor;
    envmark.style.position = 'fixed';
    envmark.style.width = '160px';
    envmark.style.textAlign = 'center';
    envmark.style.top = '35px';
    if(global.labelLayout === 'right') {
        envmark.style.right = '-35px';
        envmark.style.transform = "rotate(45deg)";
    } else {
        envmark.style.left = '-35px';
        envmark.style.transform = "rotate(-45deg)";
    }
    envmark.style.zIndex = 9999999;
    envmark.style.padding = '5px 0';
    envmark.style.lineHeight = "15px";
    envmark.style.fontSize = "15px";
    envmark.innerText = item.name;
    if(global.labelHidden === 'click') {
        envmark.onclick = delLabel.bind(envmark, labelID);
    } else { // none
    }
    return envmark;
};
const delLabel = (labelID) => {
    document.getElementById(labelID).remove();
};
const loadEC4CE = () => {
    chrome.storage.sync.get(['items', 'global']).then(
        (result) => {
            let items = result.items.reverse();
            let global = result.global;
            let envmark = null;
            for(let i = 0; i < items.length; i++) {
                const item = items[i];
                let currentHost = window.location.host;
                if (item.type === 'regexp') {
                    if(new RegExp(item.hostName).test(currentHost)) {
                        envmark = createEnvmarkFnc(item, global);                       
                    }
                } else { // type == eq
                    if(currentHost == item.hostName) {
                        envmark = createEnvmarkFnc(item, global);
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
