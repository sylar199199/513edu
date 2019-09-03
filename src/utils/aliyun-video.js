import store from '@store/index'

const createAliyunVideoScript = async url => {
  await new Promise((resolve, reject) => {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.charset = 'utf-8'
    if (script.readyState) {
      //IE
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          resolve({
            ok: true,
            msg: 'js视频插件加载完成',
          })
        } else {
          reject({
            ok: false,
            msg: 'js视频插件加载失败',
          })
        }
      }
    } else {
      //Others
      script.onload = () => {
        resolve({
          ok: true,
          msg: 'js视频插件加载完成',
        })
      }
      script.onerror = () => {
        reject({
          ok: false,
          msg: 'js视频插件加载失败',
        })
      }
    }
    script.src = url
    head.appendChild(script)
  })
}

const createAliyunVideoLink = async url => {
  await new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', url)
    link.onload = () => {
      resolve({
        ok: true,
        msg: 'css视频插件加载完成',
      })
    }
    link.onerror = () => {
      reject({
        ok: false,
        msg: 'css视频插件加载失败',
      })
    }
    const heads = document.getElementsByTagName('head')
    if (heads.length) heads[0].appendChild(link)
    else doc.documentElement.appendChild(link)
  })
}

export const createAliyunPlugin = async url => {
  const res = await Promise.all([
    createAliyunVideoScript(url.js),
    createAliyunVideoLink(url.css),
  ])
}
// 测试环境以及生产环境地址
export const pluginUrls =
  process.env.VUE_APP_BASE_URL === 'development'
    ? {
        js: 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js',
        css:
          'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css',
      }
    : {
        js: 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js',
        css:
          'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css',
      }

// h5 正式环境
export const initAliyunVideo = config => {
  var player = new Aliplayer(
    {
      qualitySort: 'asc',
      format: 'mp4',
      mediaType: 'video',
      width: '100%',
      height: '100%',
      autoplay: false,
      isLive: false,
      rePlay: false,
      playsinline: true,
      preload: true,
      controlBarVisibility: 'hover',
      useH5Prism: true,
      skinLayout: [
        {
          name: 'bigPlayButton',
          align: 'blabs',
          x: 30,
          y: 80,
        },
        {
          name: 'H5Loading',
          align: 'cc',
        },
        {
          name: 'infoDisplay',
        },
        {
          name: 'tooltip',
          align: 'blabs',
          x: 0,
          y: 56,
        },
        {
          name: 'thumbnail',
        },
        {
          name: 'controlBar',
          align: 'blabs',
          x: 0,
          y: 0,
          children: [
            {
              name: 'playButton',
              align: 'tl',
              x: 15,
              y: 12,
            },
            {
              name: 'timeDisplay',
              align: 'tl',
              x: 10,
              y: 7,
            },
            {
              name: 'fullScreenButton',
              align: 'tr',
              x: 10,
              y: 12,
            },
            {
              name: 'subtitle',
              align: 'tr',
              x: 15,
              y: 12,
            },
            {
              name: 'setting',
              align: 'tr',
              x: 15,
              y: 12,
            },
            {
              name: 'volume',
              align: 'tr',
              x: 5,
              y: 10,
            },
          ],
        },
      ],
      ...config,
      components: [
        {
          name: 'MemoryPlayComponent',
          type: AliPlayerComponent.MemoryPlayComponent,
        },
      ],
    },
    function(player) {
      console.log('播放器创建了。')
      //player.seek(120)
      const speedSelectDom = document.querySelector(
        '.prism-speed-selector.prism-setting-selector',
      )
      const settingDom = document.querySelector('.prism-setting-list')
      const btn = document.querySelector('.prism-play-btn')
      const speedSettingDom = document.querySelector(
        '.prism-setting-item.prism-setting-speed',
      )
      if (speedSelectDom.innerHTML) speedSelectDom.innerHTML = null
      if (settingDom.childNodes.length === 4)
        settingDom.removeChild(speedSettingDom)

      btn.onclick = function() {
        let sign = store.state.route.params.id
        var currentTime = parseInt(player.getCurrentTime()).toString()
        localStorage.setItem(sign, currentTime)
      }
    },
  )
  return player
}

export const initTestAliyunVideo = config => {
  var player = new Aliplayer(
    {
      qualitySort: 'asc',
      format: 'mp4',
      mediaType: 'video',
      width: '100%',
      height: '100%',
      autoplay: false,
      isLive: false,
      rePlay: false,
      playsinline: true,
      preload: true,
      controlBarVisibility: 'hover',
      useH5Prism: true,
      skinLayout: [
        {
          name: 'bigPlayButton',
          align: 'blabs',
          x: 30,
          y: 80,
        },
        {
          name: 'H5Loading',
          align: 'cc',
        },
        {
          name: 'infoDisplay',
        },
        {
          name: 'tooltip',
          align: 'blabs',
          x: 0,
          y: 56,
        },
        {
          name: 'thumbnail',
        },
        {
          name: 'controlBar',
          align: 'blabs',
          x: 0,
          y: 0,
          children: [
            {
              name: 'playButton',
              align: 'tl',
              x: 15,
              y: 12,
            },
            {
              name: 'timeDisplay',
              align: 'tl',
              x: 10,
              y: 7,
            },
            {
              name: 'fullScreenButton',
              align: 'tr',
              x: 10,
              y: 12,
            },
            {
              name: 'subtitle',
              align: 'tr',
              x: 15,
              y: 12,
            },
            {
              name: 'setting',
              align: 'tr',
              x: 15,
              y: 12,
            },
            {
              name: 'volume',
              align: 'tr',
              x: 5,
              y: 10,
            },
          ],
        },
      ],
      ...config,
    },
    function(player) {
      const speedSelectDom = document.querySelector(
        '.prism-speed-selector.prism-setting-selector',
      )
      const settingDom = document.querySelector('.prism-setting-list')
      const speedSettingDom = document.querySelector(
        '.prism-setting-item.prism-setting-speed',
      )
      speedSelectDom.innerHTML = null
      settingDom.removeChild(speedSettingDom)
      console.log('播放器创建了。')
    },
  )
  return player
}
