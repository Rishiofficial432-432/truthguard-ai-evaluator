
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestCaseForm from "@/components/TestCaseForm";
import TestCaseList from "@/components/TestCaseList";
import ModelResponseForm from "@/components/ModelResponseForm";
import BenchmarkResults from "@/components/BenchmarkResults";
import { 
  TestCase, 
  BenchmarkReport, 
  runBenchmark, 
  sampleTestCases 
} from "@/lib/truthGuardEvaluator";
import { ShieldCheck, Save, Upload, Download } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [benchmarkReport, setBenchmarkReport] = useState<BenchmarkReport | null>(null);
  const [activeTab, setActiveTab] = useState("test-cases");

  const handleAddTestCase = (testCase: TestCase) => {
    setTestCases((prev) => [...prev, testCase]);
    toast.success("Test case added successfully!");
  };

  const handleDeleteTestCase = (id: string) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
    toast.info("Test case removed");
  };

  const handleLoadSampleTestCases = () => {
    setTestCases(sampleTestCases);
    toast.success("Sample test cases loaded!");
  };

  const handleEvaluateResponses = (responses: Record<string, string>) => {
    const report = runBenchmark(testCases, responses);
    setBenchmarkReport(report);
    setActiveTab("results");
    toast.success("Evaluation completed!");
  };

  const handleSaveTestCases = () => {
    const dataStr = JSON.stringify(testCases, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'truthguard-test-cases.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success("Test cases saved to file!");
  };

  const handleLoadTestCases = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (Array.isArray(json)) {
          setTestCases(json);
          toast.success("Test cases loaded successfully!");
        } else {
          toast.error("Invalid file format!");
        }
      } catch (error) {
        toast.error("Failed to parse file!");
      }
    };
    reader.readAsText(file);
    // Reset the input value so the same file can be loaded again
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <ShieldCheck className="h-10 w-10 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TruthGuard</h1>
                <p className="text-gray-500">AI Benchmark Evaluation System</p>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="file"
                id="upload-test-cases"
                accept=".json"
                className="hidden"
                onChange={handleLoadTestCases}
              />
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleLoadSampleTestCases}
              >
                <Upload className="h-4 w-4 mr-2" />
                Load Samples
              </Button>
              <label htmlFor="upload-test-cases">
                <Button variant="outline" size="sm" className="flex items-center" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </span>
                </Button>
              </label>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center"
                onClick={handleSaveTestCases}
                disabled={testCases.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="test-cases">Test Cases</TabsTrigger>
            <TabsTrigger 
              value="evaluation"
              disabled={testCases.length === 0}
            >
              Evaluation
            </TabsTrigger>
            <TabsTrigger 
              value="results"
              disabled={!benchmarkReport}
            >
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="test-cases" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <TestCaseForm onAddTestCase={handleAddTestCase} />
              <TestCaseList 
                testCases={testCases} 
                onDeleteTestCase={handleDeleteTestCase} 
              />
            </div>
            
            {testCases.length > 0 && (
              <div className="text-center mt-6">
                <Button 
                  onClick={() => setActiveTab("evaluation")}
                  size="lg"
                >
                  Continue to Evaluation
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="evaluation">
            <ModelResponseForm 
              testCases={testCases}
              onSubmitResponses={handleEvaluateResponses}
            />
          </TabsContent>

          <TabsContent value="results">
            <BenchmarkResults report={benchmarkReport} />
            
            <div className="text-center mt-8">
              <Button 
                onClick={() => setActiveTab("test-cases")}
                variant="outline"
              >
                Back to Test Cases
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-6 bg-white mt-8">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>TruthGuard - AI Benchmark Evaluation System</p>
          <p className="mt-1">© 2025 TruthGuard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
