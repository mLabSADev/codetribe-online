import './src/styles/global.css'
import 'prismjs/themes/prism-tomorrow.css'
// import './src/styles/theme.less'

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(`This application has been updated. Reload to display latest version?`)

    if (answer === true) {
        window.location.reload()
    }
}