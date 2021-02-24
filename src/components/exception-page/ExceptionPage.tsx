import React from 'react'
import styles from './ExceptionPage.module.scss'

interface ExceptionPage {
  props: {
    code: 403 | 404 | 500
    message?: string
    children?: React.ReactChild
  }
}

class ExceptionPage extends React.Component {
  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.errorIcon}>
          {
            {
              403: (
                <img
                  src="https://file-static.pscrow.com/saas/UTB5JC.svg"
                  alt="UTB5JC"
                />
              ),
              404: (
                <img
                  src="https://file-static.pscrow.com/saas/bQfRiy.svg"
                  alt="bQfRiy"
                />
              ),
              500: (
                <img
                  src="https://file-static.pscrow.com/saas/Tm1Abq.svg"
                  alt="Tm1Abq"
                />
              )
            }[this.props.code]
          }
        </div>
        {this.props.message ? (
          <>
            <div className={styles.title}>{this.props.code}</div>
            <div className={styles.subTitle}>{this.props.message}</div>
          </>
        ) : null}
        {this.props.children}
      </div>
    )
  }
}

export default ExceptionPage
