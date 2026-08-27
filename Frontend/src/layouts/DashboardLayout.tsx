import { Outlet } from 'react-router-dom'
import Sidebar from '../components/SideBar'

import styles from './DashboardLayout.module.css'

const DashboardLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />

      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div>
            <h3>Material Code Harmonization</h3>
          </div>

          <div className={styles.topbarRight}>
            <div className={styles.profile}>
              <div className={styles.profileAvatar}>A</div>
              <span className={styles.profileName}>Administrator</span>
            </div>
          </div>
        </header>

        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default DashboardLayout