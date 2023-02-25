export{}

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      title: 'Simplify "%s"',
      contexts: ["selection"],
      id: "myContextMenuId"
    })
  })
  type WikiTldrThumbnail = {
    source: string
    width: number
    height: number
  }
  
  export type WikiTldr = {
    query: string
    type: string
    title: string
    displaytitle: string
    thumbnail: WikiTldrThumbnail
    originalimage: WikiTldrThumbnail
    lang: string
    description: string
    extract: string
    extract_html: string
  }
  
  export type WikiMessage = {
    type: string
    text: string
  }
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    const dict = info.selectionText

    
    chrome.tabs.sendMessage(tab.id, {
      type: "lookup",
      text: dict
    }as WikiMessage)

    chrome.storage.sync.set({'dict1': dict});

  })
  