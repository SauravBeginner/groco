import { Star, ChevronDown } from "lucide-react";
import { useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "../loader/ProductDetailsSkeleton";
import { SamllButton } from "../components";
import withScrollTop from "../hoc/withScrollTop";
import {
  useAddToCartMutation,
  useFetchProductDetailsQuery,
} from "../redux/apiSlice";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return;
  }
  const { data: item, isLoading } = useFetchProductDetailsQuery(id);
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: id, quantity: 1 });
    } catch (err) {
      console.error("Failed to add to cart: ", err);
    }
  };
  if (isLoading) return <ProductDetailsSkeleton />;

  const product = item?.product;

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-5 py-24">
        <div className="mx-auto md:flex justify-center flex:col items-center">
          <img
            alt="Nike Air Max 21A"
            className="h-64 w-full rounded object-cover lg:h-96"
            loading="lazy"
            src={product?.thumbNail}
          />
          <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
            <h2 className="text-sm font-semibold tracking-widest text-gray-500">
              {product?.name}
            </h2>
            <h1 className="my-4 text-3xl font-semibold text-black">
              {product?.name.toUpperCase()}
            </h1>
            <div className="my-4 flex items-center">
              <span className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" />
                ))}
                <span className="ml-3 inline-block text-xs font-semibold">
                  4 Reviews
                </span>
              </span>
            </div>
            <p className="leading-relaxed">
              {product?.description ||
                `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur
              rem amet repudiandae neque adipisci eum enim, natus illo inventore
              totam?`}
            </p>
            <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5">
              <div className="flex items-center">
                <span className="mr-3 text-sm font-semibold">Color</span>
                <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-green-200 focus:outline-none"></button>
              </div>
              <div className="ml-auto flex items-center">
                <span className="mr-3 text-sm font-semibold">Size</span>
                <div className="relative">
                  <select className="appearance-none rounded border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black">
                    <option>8 UK</option>
                    <option>9 UK</option>
                    <option>10 UK</option>
                  </select>
                  <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                    <ChevronDown size={16} />
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="title-font text-xl font-bold text-gray-900">
                ₹47,199
              </span>
              <SamllButton type="button" onClick={handleAddToCart}>
                Add to Cart
              </SamllButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withScrollTop(ProductDetails);
