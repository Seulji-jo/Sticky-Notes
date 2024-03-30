import {
  PluginAction,
  PluginCallbackFunction,
  PluginMessagePayload,
} from '../shared';

figma.showUI(__html__);

function isPayload(payload: unknown): payload is PluginMessagePayload {
  return (
    typeof payload === 'object' &&
    Object.prototype.hasOwnProperty.call(payload, 'type') &&
    Object.prototype.hasOwnProperty.call(payload, 'randomQuote')
  );
}

const fontArray = [
  {
    family: 'Inter',
    style: 'Regular',
  },
  {
    family: 'Roboto',
    style: 'Regular',
  },
];

async function loadFonts() {
  // roboto 폰트 가져오고
  // await figma.loadFontAsync({
  //   family: 'Inter',
  //   style: 'Regular',
  // });
  // await figma.loadFontAsync({
  //   family: 'Roboto',
  //   style: 'Regular',
  // });
  fontArray.forEach(async (font) => figma.loadFontAsync(font));
}

function generateRandomQuote({ randomQuote }: PluginMessagePayload) {
  // 임의의 인용문 데이터 출력
  console.log('document node', figma.root);
  console.log('curr page node', figma.currentPage);
  console.log('선택하는 노드들의 배열', figma.currentPage.selection);

  const currentSelectionNode = figma.currentPage.selection[0];
  console.log('선택하는 노드', currentSelectionNode);

  if (currentSelectionNode?.type === 'TEXT') {
    currentSelectionNode.fontName = {
      family: 'Inter',
      style: 'Regular',
    };
    currentSelectionNode.characters = `${randomQuote.text} - ${
      randomQuote.author || 'Unknown'
    }`;
  } else {
    const rect = figma.createRectangle();
    const text = figma.createText();

    rect.x = 50;
    rect.y = 50;
    text.x = 50;
    text.y = 50;
    rect.resize(200, 100);
    text.resize(180, 80);
    rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
    text.characters = `${randomQuote.text} - ${
      randomQuote.author || 'Unknown'
    }`;
    text.fontName = {
      family: 'Roboto',
      style: 'Regular',
    };
    text.fontSize = 18;
    text.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  }
}

loadFonts().then(() => {
  figma.ui.onmessage = (payload: unknown) => {
    const callbackMap: Record<PluginAction, PluginCallbackFunction> = {
      generateRandomQuote,
    };

    if (isPayload(payload) && callbackMap[payload.type]) {
      callbackMap[payload.type](payload);
    }
  };
});
