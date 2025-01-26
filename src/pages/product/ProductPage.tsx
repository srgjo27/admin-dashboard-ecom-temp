import { Button, Label, Modal, Select, Textarea, TextInput } from "flowbite-react";
import useProducts from "../../hooks/useProduct";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Product } from "../../data/interfaces/resProduct";

function ProductPage() {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const { products, categories, addProduct, removeProduct, updateProduct } = useProducts();
    const [searchKeyword, setSearchKeyword] = useState("");

    function onCloseModal() {
        setOpenModal(false);
        setIsEditing(false);
        setCurrentProduct(null);
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget);
            const productData = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")),
                sku: formData.get("sku") as string,
                quantity: Number(formData.get("quantity")),
                categoryId: Number(formData.get("categoryId")),
            };

            if (isEditing && currentProduct) {
                await updateProduct(
                    currentProduct.id,
                    productData.name,
                    productData.description,
                    productData.price,
                    productData.sku,
                    productData.quantity,
                    productData.categoryId
                ).then(() => {
                    toast.success("Produk berhasil diperbarui");
                });
            } else {
                await addProduct(
                    productData.name,
                    productData.description,
                    productData.price,
                    productData.sku,
                    productData.quantity,
                    productData.categoryId
                ).then(() => {
                    toast.success("Produk berhasil ditambahkan");
                });
            }

            setOpenModal(false);
        } catch (e) {
            const error = e as Error;
            console.error(error.message);
            toast.error(error.message);
        }
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: "Hapus Produk",
            text: "Apakah Anda yakin ingin menghapus produk ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#198754",
            cancelButtonText: "Tidak",
            cancelButtonColor: "#ff0e0e",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await removeProduct(id);
                    toast.success("Produk berhasil dihapus");
                } catch (error) {
                    const err = error as Error;
                    console.error(err.message);
                    toast.error(err.message);
                }
            }
        });
    };

    const handleEdit = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setOpenModal(true);
    };

    return (
        <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
            <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-white dark:bg-gray-900">
                <div className="flex items-center flex-column flex-wrap space-x-4 lg:space-x-4 md:space-x-2">
                    <Button
                        onClick={() => setOpenModal(true)}
                        size="xs"
                        className="rounded-md"
                    >Tambah Produk</Button>
                </div>
                <label htmlFor="table-search-products" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search-products"
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        value={searchKeyword}
                        onChange={handleSearch}
                        />
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Name
                                <a href="#"><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Deskripsi
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Harga
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                SKU
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Jumlah
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="flex items-center">
                                Kategori
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr
                            key={product.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input
                                        id={`checkbox-${product.id}`}
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor={`checkbox-${product.id}`} className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-900 dark:text-white">{product.name}</td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{product.description}</td>
                            <td className="px-6 py-4 text-gray-900 dark:text-white">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                            </td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{product.sku}</td>
                            <td className="px-6 py-4 text-gray-900 dark:text-white">{product.quantity}</td>
                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{product.category.name}</td>
                            <td className="px-6 py-4">
                                <button
                                    className="font-bold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    Hapus
                                </button>
                                <button
                                    className="font-bold text-orange-300 dark:text-orange-400 hover:text-orange-300 dark:hover:text-orange-400"
                                    onClick={() => handleEdit(product)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <>
                <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{
                                    isEditing ? "Edit Produk" : "Tambah Produk"
                                }</h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Nama Produk" />
                                    </div>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        defaultValue={currentProduct?.name || ""}
                                        placeholder="Nama Produk"
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="Deskripsi" />
                                    </div>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={currentProduct?.description || ""}
                                        placeholder="Deskripsi..."
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="price" value="Harga" />
                                    </div>
                                    <TextInput
                                        id="price"
                                        name="price"
                                        type="number"
                                        defaultValue={currentProduct?.price || ""}
                                        placeholder="Harga"
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="sku" value="SKU" />
                                    </div>
                                    <TextInput
                                        id="sku"
                                        name="sku"
                                        defaultValue={currentProduct?.sku || ""}
                                        placeholder="SKU"
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="quantity" value="Jumlah" />
                                    </div>
                                    <TextInput id="quantity" name="quantity" type="number" placeholder="Jumlah" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="categoryId" value="Kategori" />
                                    </div>
                                    <Select
                                        id="categoryId"
                                        name="categoryId"
                                        defaultValue={currentProduct?.category?.id || ""}
                                    >
                                        <option value="">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="w-full">
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                                    >{isEditing ? "Simpan Perubahan" : "Simpan"}</Button>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        </div>
    );
}

export default ProductPage