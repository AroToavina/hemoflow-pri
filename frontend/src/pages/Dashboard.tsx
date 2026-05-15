import React from 'react';
import { useStats, useTrends } from '../hooks/use-dashboard-data';
import { DashboardTrends } from '../components/dashboard-trends';
import { Users, Droplets, Building2, ArrowUpRight, ArrowDownRight } from "lucide-react";

const Dashboard: React.FC = () => {
    const { data: stats, isLoading } = useStats();

    if (isLoading || !stats) {
        return <div className="p-10 text-center animate-pulse">Chargement des données...</div>;
    }

    return (
        <>
            <div className="px-6 lg:px-10 pt-10 pb-6 flex flex-wrap items-end justify-between gap-6">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-blood-600 mb-3">
                        Vue d'ensemble
                    </p>
                    <h1 className="font-display font-extrabold text-4xl lg:text-5xl text-ink leading-[0.95]">
                        Tableau de bord
                    </h1>
                </div>
            </div>

            <div className="px-6 lg:px-10 pb-16 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard 
                        title="Donneurs Actifs" 
                        value={stats.totalDonneurs.toString()} 
                        icon={<Users className="size-5 text-blue-600" />} 
                        trend={`+${stats.nouveauxDonneurs30j} nouveaux`}
                        trendType="up"
                    />
                    <StatCard 
                        title="Dons Réalisés" 
                        value={stats.donsSemaine.toString()} 
                        icon={<Droplets className="size-5 text-blood-600" />} 
                        trend="Cette semaine"
                        trendType="up"
                    />
                    <StatCard 
                        title="Centres Actifs" 
                        value={stats.centresActifs.toString()} 
                        icon={<Building2 className="size-5 text-green-600" />} 
                        trend={`${stats.demandesUrgentes} rejets`}
                        trendType="neutral"
                    />
                </div>

                <DashboardTrends />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="table-container">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-display font-bold text-xl">Alertes de Stock</h3>
                            <span className="text-xs text-ink-muted">Mise à jour en temps réel</span>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Groupe Sanguin</th>
                                    <th>Rhésus</th>
                                    <th>Niveau d'Alerte</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><span className="font-bold text-lg">O</span></td>
                                    <td><span className="text-lg">-</span></td>
                                    <td><span className="badge badge-urgent">CRITIQUE (3.2L)</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-bold text-lg">A</span></td>
                                    <td><span className="text-lg">+</span></td>
                                    <td><span className="badge badge-normal">OPTIMAL (15.8L)</span></td>
                                </tr>
                                <tr>
                                    <td><span className="font-bold text-lg">B</span></td>
                                    <td><span className="text-lg">-</span></td>
                                    <td><span className="badge badge-normal">STABLE (8.4L)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-surface rounded-2xl border border-rule p-6">
                        <h3 className="font-display font-bold text-xl mb-4">Activités Récentes</h3>
                        <div className="space-y-4">
                            <ActivityItem 
                                title="Nouveau don enregistré" 
                                description="Jean Dupont a donné au Centre de Paris" 
                                time="Il y a 2h" 
                                icon={<Droplets className="size-4 text-blood-500" />} 
                            />
                            <ActivityItem 
                                title="Nouveau donneur inscrit" 
                                description="Marie Curie (Groupe A+)" 
                                time="Il y a 5h" 
                                icon={<Users className="size-4 text-blue-500" />} 
                            />
                            <ActivityItem 
                                title="Stock utilisé" 
                                description="2 unités de O- transférées à l'Hôpital Saint-Louis" 
                                time="Hier" 
                                icon={<ArrowDownRight className="size-4 text-orange-500" />} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

function StatCard({ title, value, icon, trend, trendType }: any) {
    return (
        <div className="bg-surface rounded-2xl border border-rule p-6 flex flex-col gap-4 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div className="size-10 rounded-xl bg-surface-elevated border border-rule grid place-items-center">
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${
                    trendType === 'up' ? 'text-green-600' : trendType === 'down' ? 'text-red-600' : 'text-ink-muted'
                }`}>
                    {trendType === 'up' && <ArrowUpRight className="size-3" />}
                    {trendType === 'down' && <ArrowDownRight className="size-3" />}
                    {trend}
                </div>
            </div>
            <div>
                <p className="text-sm text-ink-muted font-medium mb-1">{title}</p>
                <p className="text-3xl font-display font-extrabold text-ink">{value}</p>
            </div>
        </div>
    );
}

function ActivityItem({ title, description, time, icon }: any) {
    return (
        <div className="flex gap-4 p-3 rounded-xl hover:bg-surface-elevated transition-colors">
            <div className="size-8 shrink-0 rounded-lg bg-surface-elevated grid place-items-center border border-rule">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{title}</p>
                <p className="text-xs text-ink-muted truncate">{description}</p>
            </div>
            <div className="text-[10px] text-ink-muted whitespace-nowrap">{time}</div>
        </div>
    );
}

export default Dashboard;
