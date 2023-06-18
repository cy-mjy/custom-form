import dayjs from 'dayjs'


/**
 * @param { { children?: any[] }[] } widgets
 * @param { any[] } set
 */
export function flatWidgets(widgets, set = []) {
  widgets.forEach((w) => {
    set.push(w)

    if(w.children) {
      flatWidgets(w.children, set)
    }
  })

  return set
}

export function formatTime(time, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

/**
 * @param {string} filename
 * @returns {string}
 */
export const getExt = (filename) => {
  const ext = filename.split('.').slice(-1)[0]

  const fileType = {
    audio: ['MP3', 'WAV', 'WMA', 'FLAC', 'AAC'],
    video: ['mp4', 'avi', 'mkv', 'flv', 'webm'],
    image: ['JPEG', 'WEBP', 'GIF', 'JPG', 'PNG', 'BMP'],
    csv: ['csv'],
    doc: ['doc', 'docx'],
    ppt: ['ppt', 'pptx'],
    xls: ['xls', 'xlsx'],
    pdf: ['pdf'],
    txt: ['txt'],
    zip: ['zip', '7z', 'rar'],
  }

  let finalExt = ''

  Object.keys(fileType).forEach((k) => {
    if(fileType[k].map((t) => t.toLowerCase()).includes(ext.toLowerCase())) {
      finalExt = k
    }
  })

  if(finalExt === '') {
    finalExt = 'unknow'
  }

  return finalExt
}

/**
 * @param {number} size
 * @returns {string}
 */
export const formatFileSize = (size) => {
  if(size > 1024 * 1024 * 1024) {
    return `${(+Number(size / 1024 / 1024 / 1024).toFixed(1))}G`
  } else if(size > 1024 * 1024) {
    return `${(+Number(size / 1024 / 1024).toFixed(1))}M`
  } else if (size > 1024) {
    return `${(+Number(size / 1024).toFixed(1))}K`
  } else {
    return `${size}B`
  }
}
