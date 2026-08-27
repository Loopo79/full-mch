import { useNavigate } from "react-router-dom";
import {
    ArrowUpRight,
    CheckCircle2,
    Clock3,
    FileSpreadsheet,
    Package,
    Sparkles,
    TrendingUp,
} from "lucide-react";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleProcessNewFile = () => {
        navigate("/csv");
    };

    return (
        <div className="page">
            {/* Header */}
            <div className={`page-header ${styles.dashboardHeader}`}>
                <div>
                    <p className={styles.eyebrow}>OVERVIEW</p>
                    <h1>Dashboard</h1>
                    <p>
                        Monitor your material data and harmonization activity.
                    </p>
                </div>

                <button
                    className={styles.primaryButton}
                    onClick={handleProcessNewFile}
                >
                    <FileSpreadsheet size={16} />
                    Process New File
                </button>
            </div>

            {/* Statistics Section (Aligned Layout) */}
            <div className={styles.statsGrid}>
                {/* Metric 1: Total Materials */}
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>
                            Total Materials
                        </span>
                        <span className={styles.statBadge}>
                            <TrendingUp size={12} />
                            +12.5%
                        </span>
                    </div>

                    <div className={styles.statBody}>
                        <strong className={styles.statValue}>1,248</strong>
                    </div>

                    {/* Reserved baseline space to preserve card height & alignment */}
                    <div className={styles.statFooter}>
                        <span className={styles.statSubtext}>&nbsp;</span>
                    </div>
                </div>

                {/* Metric 2: Harmonized */}
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Harmonized</span>
                        <span className={styles.statPercentage}>87.8%</span>
                    </div>

                    <div className={styles.statBody}>
                        <strong className={styles.statValue}>1,096</strong>
                    </div>

                    <div className={styles.statFooter}>
                        <div className={styles.progressTrack}>
                            <div
                                className={styles.progressBar}
                                style={{ width: "87.8%" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Metric 3: Pending Review */}
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Pending Review</span>
                    </div>

                    <div className={styles.statBody}>
                        <strong className={styles.statValue}>87</strong>
                    </div>

                    <div className={styles.statFooter}>
                        <span className={styles.statSubtext}>
                            7.0% requires verification
                        </span>
                    </div>
                </div>

                {/* Metric 4: Processed Files */}
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>
                            Processed Files
                        </span>
                    </div>

                    <div className={styles.statBody}>
                        <strong className={styles.statValue}>65</strong>
                    </div>

                    <div className={styles.statFooter}>
                        <span className={styles.statSubtext}>
                            Avg. 2.1 files per day
                        </span>
                    </div>
                </div>
            </div>

            {/* Main dashboard grid */}
            <div className={styles.dashboardGrid}>
                {/* Harmonization overview */}
                <div
                    className={`${styles.dashboardCard} ${styles.overviewCard}`}
                >
                    <div className={styles.cardHeader}>
                        <div>
                            <h2>Harmonization Overview</h2>
                            <p>Material processing performance</p>
                        </div>

                        <select
                            className={styles.periodSelect}
                            defaultValue="30"
                        >
                            <option value="7">Last 7 days</option>
                            <option value="30">Last 30 days</option>
                            <option value="90">Last 90 days</option>
                        </select>
                    </div>

                    <div className={styles.chartArea}>
                        <div className={styles.chartPlaceholder}>
                            <div className={styles.chartLine}>
                                <span style={{ height: "35%" }} />
                                <span style={{ height: "48%" }} />
                                <span style={{ height: "42%" }} />
                                <span style={{ height: "62%" }} />
                                <span style={{ height: "55%" }} />
                                <span style={{ height: "74%" }} />
                                <span style={{ height: "88%" }} />
                            </div>

                            <div className={styles.chartLabels}>
                                <span>Aug 20</span>
                                <span>Aug 21</span>
                                <span>Aug 22</span>
                                <span>Aug 23</span>
                                <span>Aug 24</span>
                                <span>Aug 25</span>
                                <span>Aug 26</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.overviewSummary}>
                        <div>
                            <span>Total Processed</span>
                            <strong>1,248</strong>
                        </div>

                        <div>
                            <span>Successfully Matched</span>
                            <strong>1,096</strong>
                        </div>

                        <div>
                            <span>Match Rate</span>
                            <strong>87.8%</strong>
                        </div>
                    </div>
                </div>

                {/* AI section */}
                <div className={`${styles.dashboardCard} ${styles.aiCard}`}>
                    <div className={styles.aiIcon}>
                        <Sparkles size={20} />
                    </div>

                    <p className={styles.eyebrow}>AI ENGINE</p>

                    <h2>Intelligent Harmonization</h2>

                    <p className={styles.aiDescription}>
                        AI-assisted material matching helps identify the most
                        appropriate standardized material codes from your data.
                    </p>

                    <div className={styles.aiStat}>
                        <div>
                            <span>AI Match Accuracy</span>
                            <strong>94.6%</strong>
                        </div>

                        <div className={styles.progress}>
                            <span />
                        </div>
                    </div>

                    <button className={styles.secondaryButton}>
                        View AI Insights
                        <ArrowUpRight size={15} />
                    </button>
                </div>
            </div>

            {/* Recent activity */}
            <div className={`${styles.dashboardCard} ${styles.activityCard}`}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2>Recent Activity</h2>
                        <p>Latest material processing activity</p>
                    </div>

                    <button className={styles.textButton}>
                        View all
                        <ArrowUpRight size={14} />
                    </button>
                </div>

                <div className={styles.activityTable}>
                    <div
                        className={`${styles.tableRow} ${styles.tableHeading}`}
                    >
                        <span>Material</span>
                        <span>Original Code</span>
                        <span>Harmonized Code</span>
                        <span>Status</span>
                        <span>Confidence</span>
                    </div>

                    <div className={styles.tableRow}>
                        <div className={styles.materialName}>
                            <div className={styles.tableIcon}>
                                <Package size={15} />
                            </div>

                            <div>
                                <strong>Stainless Steel Sheet</strong>
                                <small>Metal Materials</small>
                            </div>
                        </div>

                        <span>MAT-2048</span>
                        <span>SS-304-SHT</span>

                        <span
                            className={`${styles.status} ${styles.completed}`}
                        >
                            <CheckCircle2 size={13} />
                            Harmonized
                        </span>

                        <span className={styles.confidence}>98%</span>
                    </div>

                    <div className={styles.tableRow}>
                        <div className={styles.materialName}>
                            <div className={styles.tableIcon}>
                                <Package size={15} />
                            </div>

                            <div>
                                <strong>Industrial Rubber Seal</strong>
                                <small>Rubber Products</small>
                            </div>
                        </div>

                        <span>MAT-1982</span>
                        <span>RBR-SEAL-IND</span>

                        <span
                            className={`${styles.status} ${styles.completed}`}
                        >
                            <CheckCircle2 size={13} />
                            Harmonized
                        </span>

                        <span className={styles.confidence}>96%</span>
                    </div>

                    <div className={styles.tableRow}>
                        <div className={styles.materialName}>
                            <div className={styles.tableIcon}>
                                <Package size={15} />
                            </div>

                            <div>
                                <strong>Aluminium Rod</strong>
                                <small>Non-Ferrous Metals</small>
                            </div>
                        </div>

                        <span>MAT-1756</span>
                        <span>AL-ROD-6061</span>

                        <span className={`${styles.status} ${styles.review}`}>
                            <Clock3 size={13} />
                            Review
                        </span>

                        <span className={styles.confidence}>82%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
