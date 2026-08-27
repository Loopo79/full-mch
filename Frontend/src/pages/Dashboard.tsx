import { useState, useEffect } from "react";
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
import { getDashboardStats, getRecentActivity } from "../services/materialService";

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<{
        totalMaterials: number;
        harmonizedCount: number;
        harmonizedPercentage: number;
        pendingReview: number;
        pendingReviewPercentage: number;
        processedFiles: number;
        avgFilesPerDay: number;
        aiMatchAccuracy: number;
    } | null>(null);
    const [activity, setActivity] = useState<Array<{
        material: string;
        originalCode: string;
        harmonizedCode: string;
        status: 'Harmonized' | 'Review' | 'Unmatched';
        confidence: number;
    }>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    getDashboardStats(),
                    getRecentActivity(5)
                ]);
                setStats(statsData);
                setActivity(activityData.items);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleProcessNewFile = () => {
        navigate("/csv");
    };

    if (loading) {
        return (
            <div className="page">
                <div className={styles.dashboardHeader}>
                    <h1>Loading Dashboard...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page">
                <div className={styles.dashboardHeader}>
                    <h1>Error Loading Dashboard</h1>
                    <p style={{ color: 'red' }}>{error}</p>
                </div>
            </div>
        );
    }

    const displayStats = stats || {
        totalMaterials: 1248,
        harmonizedCount: 1096,
        harmonizedPercentage: 87.8,
        pendingReview: 87,
        pendingReviewPercentage: 7.0,
        processedFiles: 65,
        avgFilesPerDay: 2.1,
        aiMatchAccuracy: 94.6
    };

    const displayActivity = activity.length > 0 ? activity : [
        {
            material: "Stainless Steel Sheet",
            originalCode: "MAT-2048",
            harmonizedCode: "SS-304-SHT",
            status: "Harmonized",
            confidence: 98
        },
        {
            material: "Industrial Rubber Seal",
            originalCode: "MAT-1982",
            harmonizedCode: "RBR-SEAL-IND",
            status: "Harmonized",
            confidence: 96
        },
        {
            material: "Aluminium Rod",
            originalCode: "MAT-1756",
            harmonizedCode: "AL-ROD-6061",
            status: "Review",
            confidence: 82
        },
    ];

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
                        <strong className={styles.statValue}>{displayStats.totalMaterials.toLocaleString()}</strong>
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
                        <span className={styles.statPercentage}>{displayStats.harmonizedPercentage.toFixed(1)}%</span>
                    </div>

                    <div className={styles.statBody}>
                        <strong className={styles.statValue}>{displayStats.harmonizedCount.toLocaleString()}</strong>
                    </div>

                    <div className={styles.statFooter}>
                        <div className={styles.progressTrack}>
                            <div
                                className={styles.progressBar}
                                style={{ width: `${displayStats.harmonizedPercentage}%` }}
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
                        <strong className={styles.statValue}>{displayStats.pendingReview.toLocaleString()}</strong>
                    </div>

                    <div className={styles.statFooter}>
                        <span className={styles.statSubtext}>
                            {displayStats.pendingReviewPercentage.toFixed(1)}% requires verification
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
                        <strong className={styles.statValue}>{displayStats.processedFiles.toLocaleString()}</strong>
                    </div>

                    <div className={styles.statFooter}>
                        <span className={styles.statSubtext}>
                            Avg. {displayStats.avgFilesPerDay} files per day
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
                            <strong>{displayStats.totalMaterials.toLocaleString()}</strong>
                        </div>

                        <div>
                            <span>Successfully Matched</span>
                            <strong>{displayStats.harmonizedCount.toLocaleString()}</strong>
                        </div>

                        <div>
                            <span>Match Rate</span>
                            <strong>{displayStats.harmonizedPercentage.toFixed(1)}%</strong>
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
                            <strong>{displayStats.aiMatchAccuracy.toFixed(1)}%</strong>
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

                    {displayActivity.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                            <div className={styles.materialName}>
                                <div className={styles.tableIcon}>
                                    <Package size={15} />
                                </div>

                                <div>
                                    <strong>{item.material}</strong>
                                    <small>Material Category</small>
                                </div>
                            </div>

                            <span>{item.originalCode}</span>
                            <span>{item.harmonizedCode}</span>

                            <span
                                className={`${styles.status} ${
                                    item.status === 'Harmonized' ? styles.completed :
                                    item.status === 'Review' ? styles.review : styles.unmatched
                                }`}
                            >
                                {item.status === 'Harmonized' ? <CheckCircle2 size={13} /> :
                                 item.status === 'Review' ? <Clock3 size={13} /> : null}
                                {item.status}
                            </span>

                            <span className={styles.confidence}>{item.confidence}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
