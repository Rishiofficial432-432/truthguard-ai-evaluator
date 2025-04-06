
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TestCase } from "@/lib/truthGuardEvaluator";
import { BrainCircuit } from "lucide-react";

interface ModelResponseFormProps {
  testCases: TestCase[];
  onSubmitResponses: (responses: Record<string, string>) => void;
}

const ModelResponseForm = ({ testCases, onSubmitResponses }: ModelResponseFormProps) => {
  const [responses, setResponses] = useState<Record<string, string>>({});

  const handleResponseChange = (id: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Make sure we have at least one response
    if (Object.keys(responses).length === 0) return;
    onSubmitResponses(responses);
  };

  if (testCases.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <BrainCircuit className="mr-2 h-5 w-5" />
          Model Responses
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {testCases.map((testCase) => (
            <div key={testCase.id} className="space-y-2">
              <div className="p-3 bg-muted rounded-md">
                <h3 className="font-medium mb-1 text-sm">Question:</h3>
                <p className="text-sm">{testCase.input}</p>
              </div>
              <label className="text-sm font-medium block" htmlFor={`response-${testCase.id}`}>
                Model Response:
              </label>
              <Textarea
                id={`response-${testCase.id}`}
                placeholder="Enter the model's response to this question..."
                value={responses[testCase.id] || ""}
                onChange={(e) => handleResponseChange(testCase.id, e.target.value)}
                rows={3}
                required
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit">Evaluate Responses</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ModelResponseForm;
