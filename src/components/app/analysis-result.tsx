import Image from 'next/image';
import type { AnalyzeCropImageOutput } from '@/ai/flows/analyze-crop-image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { HeartPulse, Leaf, ShieldCheck, Sprout, Syringe, Bug, CircleDollarSign, ArrowRight } from 'lucide-react';

interface AnalysisResultProps {
  result: AnalyzeCropImageOutput;
  imagePreview: string;
  onReset: () => void;
}

const AnalysisResult = ({ result, imagePreview, onReset }: AnalysisResultProps) => {
  const { plantIdentification, diseaseDiagnosis, cropHealthAssessment } = result;

  const confidencePercent = diseaseDiagnosis ? Math.round(diseaseDiagnosis.confidence * 100) : 0;
  const marketValue = cropHealthAssessment ? cropHealthAssessment.marketValuePercentage : 0;

  return (
    <Card className="w-full max-w-4xl animate-in fade-in-50 slide-in-from-bottom-10 duration-500">
      <CardHeader>
        <CardTitle className="font-headline text-3xl tracking-wide">Analysis Complete</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border shadow-inner">
            <Image src={imagePreview} alt="Uploaded crop" layout="fill" objectFit="cover" />
          </div>
          <div className="space-y-2 rounded-lg bg-secondary/50 p-4">
            <h3 className="flex items-center gap-2 font-headline text-xl text-foreground">
              <Sprout className="h-5 w-5 text-primary" />
              Plant Identification
            </h3>
            <p><strong className="font-medium">Common Name:</strong> {plantIdentification.commonName}</p>
            <p><strong className="font-medium">Latin Name:</strong> <em className="text-muted-foreground">{plantIdentification.latinName}</em></p>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          {diseaseDiagnosis && (
            <div className="space-y-4 rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-headline text-xl text-destructive-foreground">
                  <Bug className="h-5 w-5" />
                  Disease Diagnosis
                </h3>
                <Badge variant="destructive">Problem Detected</Badge>
              </div>
              <Separator />
              <p className="text-lg font-semibold text-destructive-foreground">{diseaseDiagnosis.diseaseName}</p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive-foreground/80">Confidence</p>
                <div className="flex items-center gap-2">
                  <Progress value={confidencePercent} className="h-2 w-full bg-destructive-foreground/20 [&>div]:bg-destructive-foreground" />
                  <span className="font-mono text-sm font-medium text-destructive-foreground">{confidencePercent}%</span>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="fixes">
                  <AccordionTrigger className="text-base hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Syringe className="h-4 w-4" />
                      Recommended Treatment
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-destructive-foreground/90">
                    {diseaseDiagnosis.fixes}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="prevention">
                  <AccordionTrigger className="text-base hover:no-underline">
                     <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Prevention Tips
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="prose prose-sm max-w-none text-destructive-foreground/90">
                    {diseaseDiagnosis.prevention}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          {cropHealthAssessment && (
            <div className="space-y-4 rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                 <h3 className="flex items-center gap-2 font-headline text-xl text-primary">
                    <HeartPulse className="h-5 w-5" />
                    Health Assessment
                </h3>
                <Badge variant="secondary" className="border-primary/50 bg-primary/10 text-primary">Healthy</Badge>
              </div>
              <Separator />
              <p className="text-base">{cropHealthAssessment.healthDescription}</p>
              <div className="space-y-2 pt-2">
                <h4 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CircleDollarSign className="h-4 w-4"/>
                    Predicted Market Value
                </h4>
                <div className="flex items-center gap-3">
                   <Progress value={marketValue} className="h-3" />
                   <span className="font-mono text-lg font-bold text-primary">{marketValue}%</span>
                </div>
                <p className="text-xs text-muted-foreground">Compared to standard market price.</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-end border-t bg-secondary/30 px-6 py-4">
        <Button onClick={onReset}>
          Analyze Another Crop
          <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisResult;
