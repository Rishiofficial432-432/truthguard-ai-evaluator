
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TestCase } from "@/lib/truthGuardEvaluator";
import { Trash2 } from "lucide-react";

interface TestCaseListProps {
  testCases: TestCase[];
  onDeleteTestCase: (id: string) => void;
}

const TestCaseList = ({ testCases, onDeleteTestCase }: TestCaseListProps) => {
  if (testCases.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">Test Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            No test cases added yet. Add your first test case to begin.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Test Cases ({testCases.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {testCases.map((testCase) => (
          <div
            key={testCase.id}
            className="border p-4 rounded-md relative hover:bg-muted/50 transition-colors"
          >
            <Button
              variant="destructive"
              size="icon"
              className="h-6 w-6 absolute top-3 right-3"
              onClick={() => onDeleteTestCase(testCase.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <div className="mb-2">
              <h3 className="font-medium text-sm">Question:</h3>
              <p className="text-sm mt-1">{testCase.input}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm">Expected Response:</h3>
              <p className="text-sm mt-1">{testCase.expected}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TestCaseList;
