const cardContentRef = document.getElementById("content-container");
const CAT_API_KEY = 'a1e91f89-0f88-4a32-b80f-721b8fcb4171';
const CAT_API_URL = 'https://api.thecatapi.com/v1/breeds?limit=50';
const REQUEST_INIT = {
    Headers: {
        'x-api-key': CAT_API_KEY
    }
};

//Helper to create DOM node
const createDOMNode = (tagName, content, attribute = []) => {
    const elem = document.createElement(tagName);
    if (content) {
        elem.innerText = content;
    }
    if (Array.isArray(attribute)) {
        attribute.forEach(({ name, value }) => {
            elem.setAttribute(name, value);
        });
    }
    return elem;
};

//card template 
const getCardTemplate = (imgUrl, infoList = []) => {
    const containerNode = createDOMNode('div', null, [{ name: 'class', value: 'card-container' }]);
    const imageNode = createDOMNode('img', null, [{ name: 'src', value: imgUrl }]);
    const infoNodeList = infoList.map(({ title, description }) => {
        const detailNode = createDOMNode('div', null, [{ name: 'class', value: 'card-info' }]);
        const titleNode = createDOMNode('h6', title, [{ name: 'class', value: 'card-title' }]);
        const descriptionText = isFinite(description) ? `${description} out of 5` : description;
        const descriptionNode = createDOMNode('p', descriptionText, [{ name: 'class', value: 'card-text' }]);
        detailNode.append(titleNode, descriptionNode);
        return detailNode;
    });
    containerNode.append(imageNode, ...infoNodeList);
    return containerNode;
};

const getInfoList = ({ name, origin, child_friendly, energy_level, intelligence }) => {
    return [
        { title: 'Name', description: name },
        { title: 'Origin', description: origin },
        { title: 'Child friendly', description: child_friendly },
        { title: 'Energy level', description: energy_level },
        { title: 'Intelligence', description: intelligence },
    ];
};

(async () => {
    try {
        const response = await fetch(CAT_API_URL, REQUEST_INIT);
        const catList = await response.json();
        catList.forEach((item) => {
            const infoList = getInfoList(item);
            if (item.image && item.image.url) {
                const template = getCardTemplate(item.image.url, infoList);
                cardContentRef.append(template);
            }
        });
    }
    catch (e) {
        console.log(e);
    }
})();