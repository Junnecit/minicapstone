
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TrendingUp, Wrench, ShoppingBasket, PhilippinePeso, ListCheck, BadgeCheck, ArrowDown } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="relative aspect-video overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-400 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white/90">
                                <PhilippinePeso className="h-4 w-4 text-white" />
                                Total Sales
                            </CardTitle>
                            <CardDescription className="text-emerald-100">
                                Total sales of products and repairs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">₱45,231.89</p>
                            <div className="flex items-center gap-2 text-sm text-emerald-50">
                                <TrendingUp className="h-4 w-4 text-lime-200" />
                                <span>+20.1%</span>
                                <span>from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-orange-50/90">
                                <ShoppingBasket className="h-4 w-4 text-white" />
                                Product Sales
                            </CardTitle>
                            <CardDescription className="text-orange-100">
                                Total sales of products
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold">₱45,231.89</p>
                            <div className="flex items-center gap-2 text-sm text-amber-50">
                                <TrendingUp className="h-4 w-4 text-yellow-200" />
                                <span>+20.1%</span>
                                <span>from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden bg-gradient-to-br from-amber-700 via-amber-600 to-yellow-400 text-zinc-50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-zinc-100">
                                <Wrench className="h-4 w-4 text-yellow-200" />
                                Repair Sales
                            </CardTitle>
                            <CardDescription className="text-amber-100/90">
                                Total sales of repairs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-semibold text-white">₱45,231.89</p>
                            <div className="flex items-center gap-2 text-sm text-amber-50/90">
                                <TrendingUp className="h-4 w-4 text-lime-200" />
                                <span>+20.1%</span>
                                <span>from last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-500 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-indigo-50">
                                <ListCheck className="h-4 w-4 text-yellow-200" />
                                Inventory Overview
                            </CardTitle>
                            <CardDescription className="text-indigo-100/90">
                                Products & spare parts on hand
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                            <p className="text-3xl font-semibold">1,248 items</p>
                            <div className="text-sm text-indigo-50 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-lime-200" />
                                <span>+5.4% stock replenished</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-slate-100">
                                <BadgeCheck className="h-4 w-4 text-gradient-200" />
                                Total Sold Items
                            </CardTitle>
                            <CardDescription className="text-slate-300/90">
                                Units across products & repairs
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-semibold">1,254</p>
                            <div className="flex items-center gap-2 text-sm text-emerald-200 mt-2">
                                <TrendingUp className="h-4 w-4 text-emerald-200" />
                                <span>+12.6% units vs last month</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video overflow-hidden bg-gradient-to-br from-rose-700 via-rose-600 to-orange-500 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-white/90">
                            <ArrowDown className="h-4 w-4 text-white-200" />
                                Low Stock Items
                            </CardTitle>
                            <CardDescription className="text-white/70">
                                Items below reorder threshold
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <p className="text-4xl font-semibold">17</p>
                            <div className="text-sm text-white/80">Needs immediate restock</div>
                            <ul className="text-xs text-white/70 space-y-1">
                                <li>• iPhone 12 glass – 3 remaining</li>    
                                <li>• Samsung batteries – 5 remaining</li>
                                <li>• Charger cables – 9 remaining</li>
                            </ul>
                        </CardContent>
                    </Card>




                </div>

            </div>
        </AppLayout>
    );
}
