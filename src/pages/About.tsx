
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import MainLayout from "@/components/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="container max-w-4xl py-12 mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="mb-4 text-4xl font-bold text-center">About TruthGuard</h1>
          <p className="max-w-2xl text-center text-muted-foreground">
            TruthGuard is an AI benchmark system designed to evaluate the factual accuracy, 
            ethical alignment, and conciseness of AI model outputs.
          </p>
        </div>

        <Card className="mb-12 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6">
                <h2 className="mb-4 text-2xl font-semibold">About the Developer</h2>
                <p className="mb-4">
                 🧠 About Me
I’m Rishi — a developer who believes that good code doesn’t just solve problems, it reveals deeper truths. I build with clarity, question with curiosity, and think in systems. Whether it's engineering logic flows, evaluating AI behavior, or structuring ethical frameworks, I don’t just ship features — I design intent.

My focus lies in crafting technologies that matter — meaningful, thoughtful, and built to evolve. I care about how systems impact the world, how users feel when they interact with them, and how intelligence (artificial or human) can be guided toward better outcomes.

Growth is my language. Code is just one of its dialects.


                </p>
                <p className="mb-4">
                  Every new moment is a fresh start: feeling good, unstoppable, and alive.
                </p>
                <div className="mt-6">
                  <Link to="/" className="text-primary underline-offset-4 hover:underline">
                    Back to Benchmark
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center p-6 bg-muted/30">
                <img 
                  src="/lovable-uploads/85183f29-b89e-40cf-9d7e-5817dc9a4ec4.png" 
                  alt="Developer portrait" 
                  className="w-full max-w-sm rounded-lg shadow-lg"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 transition-shadow rounded-lg truthguard-card-shadow hover:shadow-lg">
            <h3 className="mb-2 text-xl font-medium">Factual Accuracy</h3>
            <p className="text-muted-foreground">
              TruthGuard evaluates responses for factual correctness and alignment with established knowledge.
            </p>
          </div>
          <div className="p-6 transition-shadow rounded-lg truthguard-card-shadow hover:shadow-lg">
            <h3 className="mb-2 text-xl font-medium">Ethical Alignment</h3>
            <p className="text-muted-foreground">
              Our benchmark tests whether AI outputs align with human values and ethical principles.
            </p>
          </div>
          <div className="p-6 transition-shadow rounded-lg truthguard-card-shadow hover:shadow-lg">
            <h3 className="mb-2 text-xl font-medium">Conciseness</h3>
            <p className="text-muted-foreground">
              We measure how effectively AI models can provide clear, concise responses without unnecessary verbosity.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
