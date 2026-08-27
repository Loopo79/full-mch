import { NavLink } from 'react-router-dom'

import styles from './SideBar.module.css'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>Material Code Harmonizer</h2>
      </div>

      <nav className={styles.sidebarNav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/csv"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          CSV Processing
        </NavLink>

        <NavLink
          to="/form"
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          Material Intake Form
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar