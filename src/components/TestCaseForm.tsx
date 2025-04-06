
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TestCase } from "@/lib/truthGuardEvaluator";
import { PlusCircle } from "lucide-react";

interface TestCaseFormProps {
  onAddTestCase: (testCase: TestCase) => void;
}

const TestCaseForm = ({ onAddTestCase }: TestCaseFormProps) => {
  const [input, setInput] = useState("");
  const [expected, setExpected] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !expected.trim()) return;

    const newTestCase: TestCase = {
      id: crypto.randomUUID(),
      input: input.trim(),
      expected: expected.trim()
    };

    onAddTestCase(newTestCase);
    setInput("");
    setExpected("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <PlusCircle className="mr-2 h-5 w-5" />
          Add Test Case
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="question">
              Question / User Input
            </label>
            <Input
              id="question"
              placeholder="E.g., What are the risks of AI?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="expected">
              Expected Response
            </label>
            <Textarea
              id="expected"
              placeholder="E.g., AI risks include bias, misuse, alignment failures, and control loss."
              value={expected}
              onChange={(e) => setExpected(e.target.value)}
              rows={3}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Add Test Case</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TestCaseForm;
