import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/DataTable';
import { ProductFormModal, type Product, type Category } from './ProductFormModal';
import { getColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface Props {
    products: Product[];
    categories: Category[];
}

const ITEMS_PER_PAGE = 10; // Change this to adjust items per page

export default function Index({ products }: { products: any[] }) {
    const { data, setData, post, put, delete: destroy } = useForm({
        name: '',
        price: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products');
    };

    const update = (product: any) => {
        const newName = prompt('New name:', product.name);
        const newPrice = prompt('New price:', product.price);

        if (newName && newPrice) {
            put(`/products/${product.id}`, {
                data: {
                    name: newName,
                    price: newPrice,
                },
            });
<<<<<<< HEAD
export default function Index({
    products: initialProducts,
    categories,
}: Props) {
    const { props } = usePage();
    const flash = props.flash as any;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<
        Product | undefined
    >();
    const [products, setProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(
        null,
    );
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Filter products based on search and category
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, selectedCategory]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const handleEdit = (product: any) => {
        // Cast to ProductFormModal.Product type
        const p = product as Product;
        setSelectedProduct(p);
        setModalOpen(true);
=======
export default function Index({ products }: { products: any[] }) {
    const { data, setData, post, put, delete: destroy } = useForm({
        name: '',
        price: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/products');
>>>>>>> 2ed229e62c0db40a52a7d1b338716046be45d1fa
    };

    const update = (product: any) => {
        const newName = prompt('New name:', product.name);
        const newPrice = prompt('New price:', product.price);

        if (newName && newPrice) {
            put(`/products/${product.id}`, {
                data: {
                    name: newName,
                    price: newPrice,
                },
            });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    const columns = getColumns(handleEdit);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />

            <div className="space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Products</h1>
                    <Button onClick={handleCreate}>+ Add Product</Button>
                </div>

                {/* CREATE */}
                <form onSubmit={submit} className="mb-4">
                    <input
                        type="text"
                        placeholder="Product name"
                        className="border p-2 mr-2"
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-2 mr-2"
                        onChange={(e) => setData('price', e.target.value)}
                    />

                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </form>

                {/* LIST */}
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td className="border p-2">{p.id}</td>
                                <td className="border p-2">{p.name}</td>
                                <td className="border p-2">{p.price}</td>
                                <td className="border p-2">

                                    <button
                                        onClick={() => update(p)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => remove(p.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
<<<<<<< HEAD
                {/* Search Bar */}
                <div className="flex gap-4">
                    <div className="relative w-96">
                        <Search className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search products by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                    <div className="text-sm font-semibold text-gray-700">Filter by Category:</div>
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            variant={selectedCategory === null ? 'default' : 'outline'}
                            className="cursor-pointer px-3 py-2"
                            onClick={() => setSelectedCategory(null)}
                        >
                            All Categories
                        </Badge>

                        {categories.map((category) => (
                            <Badge
                                key={category.id}
                                variant={selectedCategory === category.id ? 'default' : 'outline'}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-200 transition"
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.categorie_name}
                            </Badge>
                        ))}
                    </NativeSelect>
                </div>

                {/* Active Filters Display */}
                {(searchQuery || selectedCategory !== null) && (
                    <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3">
                        <div className="text-sm text-blue-800">
                            Showing{' '}
                            <span className="font-semibold">
                                {filteredProducts.length}
                            </span>{' '}
                            of{' '}
                            <span className="font-semibold">
                                {products.length}
                            </span>{' '}
                            products
                            {searchQuery && ` matching "${searchQuery}"`}
                            {selectedCategory &&
                                categories.find(
                                    (c) => c.id === selectedCategory,
                                ) &&
                                ` in ${categories.find((c) => c.id === selectedCategory)?.category_name}`}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearFilters}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Products Table */}
                {paginatedProducts.length > 0 ? (
                    <>
                        <DataTable columns={columns} data={paginatedProducts} />

                        {/* Pagination Controls */}
                        <div className="mt-6 flex items-center justify-between rounded-lg border bg-gray-50 p-4">
                            <div className="text-sm text-gray-600">
                                Page{' '}
                                <span className="font-semibold">
                                    {currentPage}
                                </span>{' '}
                                of{' '}
                                <span className="font-semibold">
                                    {totalPages}
                                </span>
                                {' | '}
                                Showing{' '}
                                <span className="font-semibold">
                                    {startIndex + 1}
                                </span>{' '}
                                to{' '}
                                <span className="font-semibold">
                                    {Math.min(
                                        endIndex,
                                        filteredProducts.length,
                                    )}
                                </span>{' '}
                                of{' '}
                                <span className="font-semibold">
                                    {filteredProducts.length}
                                </span>{' '}
                                products
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="gap-2"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                {/* Page Numbers */}
                                <div className="flex gap-1">
                                    {Array.from(
                                        { length: totalPages },
                                        (_, i) => i + 1,
                                    ).map((page) => (
                                        <Button
                                            key={page}
                                            variant={
                                                currentPage === page
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            onClick={() => setCurrentPage(page)}
                                            className="h-10 w-10 p-0"
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="gap-2"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-lg text-gray-500">
                            No products found matching your criteria.
                        </p>
                        <Button
                            variant="ghost"
                            onClick={handleClearFilters}
                            className="mt-4 text-blue-600"
                        >
                            Clear Filters and Try Again
                        </Button>
                    </div>
                )}

                {/* Modal */}
                <ProductFormModal
                    open={modalOpen}
                    onOpenChange={handleModalClose}
                    product={selectedProduct}
                    categories={categories}
                />
=======
                {/* CREATE */}
                <form onSubmit={submit} className="mb-4">
                    <input
                        type="text"
                        placeholder="Product name"
                        className="border p-2 mr-2"
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        className="border p-2 mr-2"
                        onChange={(e) => setData('price', e.target.value)}
                    />

                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </form>

                {/* LIST */}
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td className="border p-2">{p.id}</td>
                                <td className="border p-2">{p.name}</td>
                                <td className="border p-2">{p.price}</td>
                                <td className="border p-2">

                                    <button
                                        onClick={() => update(p)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => remove(p.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
>>>>>>> 2ed229e62c0db40a52a7d1b338716046be45d1fa
            </div>
        </AppLayout>
    );
}
