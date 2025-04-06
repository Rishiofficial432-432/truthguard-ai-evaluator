
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BenchmarkReport, EvaluationResult } from "@/lib/truthGuardEvaluator";
import { BarChart, Activity } from "lucide-react";

interface BenchmarkResultsProps {
  report: BenchmarkReport | null;
}

const getScoreColor = (score: number): string => {
  if (score >= 0.8) return "bg-green-500";
  if (score >= 0.6) return "bg-yellow-500";
  if (score >= 0.4) return "bg-orange-500";
  return "bg-red-500";
};

const getScoreBadge = (score: number) => {
  if (score >= 0.8) return "success";
  if (score >= 0.6) return "warning";
  if (score >= 0.4) return "default";
  return "destructive";
};

const ScoreIndicator = ({ score }: { score: number }) => {
  const percentage = score * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>Score</span>
        <span className="font-medium">{percentage.toFixed(0)}%</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

const BenchmarkResults = ({ report }: BenchmarkResultsProps) => {
  if (!report) return null;

  const getQualityDescription = (score: number): string => {
    if (score >= 0.8) return "Excellent";
    if (score >= 0.6) return "Good";
    if (score >= 0.4) return "Fair";
    return "Poor";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            TruthGuard Benchmark Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <div className="text-2xl font-bold mb-2">{(report.averageScore * 100).toFixed(0)}%</div>
              <p className="text-sm text-muted-foreground mb-4">
                Overall Quality: <span className="font-medium">{getQualityDescription(report.averageScore)}</span>
              </p>
              <ScoreIndicator score={report.averageScore} />
            </div>
            <div className="flex-1">
              <p className="text-sm mb-2">
                {report.scores.length} test cases evaluated
              </p>
              <div className="text-sm text-muted-foreground">
                {report.summary}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BarChart className="mr-2 h-5 w-5" />
            Detailed Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {report.scores.map((result: EvaluationResult) => (
            <div key={result.testCaseId} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="font-medium">Question:</h3>
                  <p className="text-sm">{result.input}</p>
                </div>
                <Badge variant={getScoreBadge(result.score) as any}>
                  {(result.score * 100).toFixed(0)}%
                </Badge>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Expected Response:</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{result.expected}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Model Response:</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{result.actual}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <ScoreIndicator score={result.score} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BenchmarkResults;
