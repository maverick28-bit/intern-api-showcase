import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using Fake Store API as a dummy JSON API
        const response = await fetch('https://fakestoreapi.com/products/1');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product';
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [toast]);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${product?.title} has been added to your cart!`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 p-6">
              <div className="space-y-4">
                <Skeleton className="aspect-square w-full rounded-lg" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-destructive bg-destructive/5">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-destructive">Error Loading Product</CardTitle>
              <CardDescription>{error}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-2xl bg-white p-8 shadow-inner">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{product.rating.rate}</span>
                <span className="text-muted-foreground">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-2">
                  {product.category}
                </Badge>
                <CardTitle className="text-3xl font-bold leading-tight">
                  {product.title}
                </CardTitle>
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-muted-foreground line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12">
                      ♡ Wishlist
                    </Button>
                    <Button variant="outline" className="h-12">
                      🔗 Share
                    </Button>
                  </div>
                </div>

                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <p>✓ Free shipping on orders over $50</p>
                  <p>✓ 30-day return policy</p>
                  <p>✓ 2-year warranty included</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;