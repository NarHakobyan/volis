'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ComingSoon() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-[90vh] relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-center p-4 min-h-[90vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-lg backdrop-blur-sm bg-background/95 border-primary/20 shadow-lg">
            <CardHeader className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                  Coming Soon
                </CardTitle>
              </motion.div>
              <CardDescription className="text-lg text-foreground/80">
                We&apos;re crafting something extraordinary. Be the first to know when we launch!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isSubscribed ? (
                <motion.form
                  onSubmit={handleSubscribe}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-muted/50 border-primary/20 placeholder:text-muted-foreground/70"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "min-w-[120px] bg-primary hover:bg-primary/90 text-primary-foreground",
                        isLoading && "animate-pulse"
                      )}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {isLoading ? "Subscribing..." : "Notify Me"}
                    </Button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-4 rounded-lg bg-primary/15 text-primary border border-primary/20"
                >
                  Thank you for subscribing! We&apos;ll keep you posted.
                </motion.div>
              )}

              <div className="flex flex-col items-center gap-4 pt-4">
                <div className="flex gap-2 items-center text-sm text-foreground/60">
                  <span className="block h-px w-8 bg-border" />
                  <span>or</span>
                  <span className="block h-px w-8 bg-border" />
                </div>

                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="bg-background hover:bg-muted/50 border-primary/20 text-foreground"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Previous Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
