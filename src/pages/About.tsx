
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const About = () => {
  return (
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
                I'm passionate about creating tools that help ensure AI systems are truthful, 
                helpful, and aligned with human values. This benchmark system is designed to 
                evaluate AI responses against expected standards.
              </p>
              <p>
                Feel free to replace this text and the image with your own information. You can 
                add your photo to the <code>src/assets/images</code> folder and update the 
                image source accordingly.
              </p>
              <div className="mt-6">
                <Link to="/" className="text-primary underline-offset-4 hover:underline">
                  Back to Benchmark
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-muted/30">
              <Avatar className="w-48 h-48 border-4 border-background">
                <AvatarImage src="/placeholder.svg" alt="Developer" />
                <AvatarFallback>YI</AvatarFallback>
              </Avatar>
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
  );
};

export default About;
