'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from './ui/separator';
import { motion } from 'framer-motion';

interface CVUploadSectionProps {
  chatId: string;
  onAppendMessage: (message: string, jobDetails?: {
    jobTitle: string;
    requirements: string;
    cvUrls: string[];
  }) => void;
}

interface SavedJob {
  id: string;
  title: string;
  requirements: string;
  savedAt: string;
}

interface SavedCV {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

const SAVED_JOBS_KEY = 'saved_jobs';
const SAVED_CVS_KEY = 'saved_cvs';

export function CVUploadSection({ chatId, onAppendMessage }: CVUploadSectionProps) {
  const [jobTitle, setJobTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedCVs, setUploadedCVs] = useState<Array<{ name: string; url: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScreening, setIsScreening] = useState(false);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('none');
  const [activeTab, setActiveTab] = useState<'job' | 'upload'>('job');

  // Load saved jobs and CVs from localStorage on component mount
  useEffect(() => {
    try {
      const savedJobsData = localStorage.getItem(SAVED_JOBS_KEY);
      const savedCVsData = localStorage.getItem(SAVED_CVS_KEY);

      if (savedJobsData) {
        const jobs = JSON.parse(savedJobsData) as SavedJob[];
        setSavedJobs(jobs);
      }

      if (savedCVsData) {
        const cvs = JSON.parse(savedCVsData) as SavedCV[];
        setSavedCVs(cvs);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
      setSavedJobs([]);
      setSavedCVs([]);
    }
  }, []);

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/files/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || 'Failed to upload file');
        }

        const data = await response.json();

        // Create a saved CV object
        const savedCV: SavedCV = {
          id: Date.now().toString(),
          name: file.name,
          url: data.url,
          uploadedAt: new Date().toISOString(),
        };

        return savedCV;
      });

      const results = await Promise.all(uploadPromises);

      // Update both the uploadedCVs state and savedCVs state
      const uploadedResults = results.map(({ name, url }) => ({ name, url }));
      setUploadedCVs((prev) => [...prev, ...uploadedResults]);

      // Update savedCVs in state and localStorage
      const updatedSavedCVs = [...savedCVs, ...results];
      setSavedCVs(updatedSavedCVs);
      localStorage.setItem(SAVED_CVS_KEY, JSON.stringify(updatedSavedCVs));

      toast.success(`Successfully uploaded ${files.length} CV${files.length > 1 ? 's' : ''}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload CVs');
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const saveJobDetails = async () => {
    if (!jobTitle.trim()) {
      toast.error('Please enter a job title');
      return;
    }
    if (!requirements.trim()) {
      toast.error('Please enter job requirements');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create a new job object
      const newJob: SavedJob = {
        id: Date.now().toString(),
        title: jobTitle,
        requirements,
        savedAt: new Date().toISOString(),
      };

      // Add to saved jobs
      const updatedJobs = [...savedJobs, newJob];
      setSavedJobs(updatedJobs);

      // Save to localStorage
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedJobs));

      toast.success('Job details saved successfully');
    } catch (error) {
      toast.error('Failed to save job details');
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadSavedJob = (jobId: string) => {
    if (!jobId) {
      // Clear form if "Select a saved job" is chosen
      setJobTitle('');
      setRequirements('');
      return;
    }

    const job = savedJobs.find(job => job.id === jobId);
    if (job) {
      setJobTitle(job.title);
      setRequirements(job.requirements);
      toast.success(`Loaded job details for: ${job.title}`);
    }
  };

  const deleteSavedJob = (jobId: string) => {
    if (!jobId) return;

    try {
      // Filter out the job to be deleted
      const updatedJobs = savedJobs.filter(job => job.id !== jobId);
      setSavedJobs(updatedJobs);

      // Update localStorage
      localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(updatedJobs));

      // Reset form if the currently selected job is deleted
      if (selectedJobId === jobId) {
        setSelectedJobId('none');
        setJobTitle('');
        setRequirements('');
      }

      toast.success('Job deleted successfully');
    } catch (error) {
      toast.error('Failed to delete job');
      console.error('Error deleting job:', error);
    }
  };

  const removeCV = (index: number) => {
    const cvToRemove = uploadedCVs[index];
    setUploadedCVs((prev) => prev.filter((_, i) => i !== index));

    // Add back to saved CVs if not already there
    const isAlreadyInSavedCVs = savedCVs.some(cv => cv.url === cvToRemove.url);
    if (!isAlreadyInSavedCVs) {
      const savedCV: SavedCV = {
        id: Date.now().toString(),
        name: cvToRemove.name,
        url: cvToRemove.url,
        uploadedAt: new Date().toISOString(),
      };
      const updatedSavedCVs = [...savedCVs, savedCV];
      setSavedCVs(updatedSavedCVs);
      localStorage.setItem(SAVED_CVS_KEY, JSON.stringify(updatedSavedCVs));
      toast.success('CV moved back to saved items');
    }
  };

  const loadSavedCVs = () => {
    setUploadedCVs(savedCVs.map(cv => ({
      name: cv.name,
      url: cv.url,
    })));
    toast.success(`Loaded ${savedCVs.length} saved CV${savedCVs.length > 1 ? 's' : ''}`);
  };

  const addSavedCVToUpload = (cv: SavedCV) => {
    // Check if CV is already in uploadedCVs
    if (!uploadedCVs.some(uploaded => uploaded.url === cv.url)) {
      setUploadedCVs(prev => [...prev, {
        name: cv.name,
        url: cv.url,
      }]);
      toast.success(`Added ${cv.name} to upload list`);
    } else {
      toast.info(`${cv.name} is already in the upload list`);
    }
  };

  const startCVMatching = async () => {
    if (uploadedCVs.length === 0) {
      toast.error('Please upload at least one CV');
      return;
    }

    if (!jobTitle.trim()) {
      toast.error('Please enter a job title');
      return;
    }

    if (!requirements.trim()) {
      toast.error('Please fill in job requirements');
      return;
    }

    setIsScreening(true);
    try {
      // First show the chat interface with the "Thinking" state
      // This will trigger the chat to be shown with the ThinkingMessage component
      onAppendMessage('', {
        jobTitle,
        requirements,
        cvUrls: uploadedCVs.map(cv => cv.url)
      });

      // Add a slight delay to ensure the UI updates before sending the actual message
      setTimeout(() => {
        // Add a message to the chat with the job details
        const jobDetailsMessage = `
I need to screen ${uploadedCVs.length} CV${uploadedCVs.length > 1 ? 's' : ''} for the following position:

# ${jobTitle}

## Requirements:
${requirements}

Please analyze the CV${uploadedCVs.length > 1 ? 's' : ''} and identify the best candidate${uploadedCVs.length > 1 ? 's' : ''} based on the requirements. Provide a detailed matching analysis showing the strengths and potential gaps for each candidate.

After completing the analysis, please highlight the most important text from the CV that matches key requirements, focusing on skills, experience, and qualifications that are most relevant to the job.
        `;

        // Append the message to the chat with job details
        onAppendMessage(jobDetailsMessage, {
          jobTitle,
          requirements,
          cvUrls: uploadedCVs.map(cv => cv.url)
        });

        toast.success('Starting CV matching analysis');
      }, 500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to start CV matching');
      setIsScreening(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto space-y-8 py-8 px-4"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">CV Matching Assistant</h1>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Find the perfect candidate by matching CVs against your job requirements
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="job">1. Define Job Requirements</TabsTrigger>
          <TabsTrigger value="upload">2. Upload CVs & Match</TabsTrigger>
        </TabsList>

        <TabsContent value="job" className="space-y-4">
          <Card className="border-2 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" y1="8" x2="2" y2="22" />
                  <line x1="17.5" y1="15" x2="9" y2="15" />
                </svg>
                Job Details
              </CardTitle>
              <CardDescription>
                Define the requirements and responsibilities for the job position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {savedJobs.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="savedJobs" className="font-medium">Saved Jobs</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Select
                        value={selectedJobId}
                        onValueChange={(value) => {
                          setSelectedJobId(value);
                          loadSavedJob(value === 'none' ? '' : value);
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a saved job" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Select a saved job</SelectItem>
                          {savedJobs.map((job) => (
                            <SelectItem key={job.id} value={job.id}>
                              {job.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {selectedJobId !== 'none' && (
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteSavedJob(selectedJobId)}
                        title="Delete selected job"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="font-medium">Job Title <span className="text-red-500">*</span></Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Senior Frontend Developer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="transition-all focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements" className="font-medium">Requirements & Responsibilities <span className="text-red-500">*</span></Label>
                <Textarea
                  id="requirements"
                  placeholder="List the key requirements and responsibilities for this position. Include both technical requirements and day-to-day responsibilities..."
                  className="min-h-[200px] transition-all focus:border-primary"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md border border-border mt-2">
                  <p className="font-medium mb-1">Tips for effective job descriptions:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Include required skills and qualifications</li>
                    <li>Describe key responsibilities and daily tasks</li>
                    <li>Mention preferred experience level and background</li>
                    <li>Specify any required certifications or education</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button
                onClick={saveJobDetails}
                disabled={isSubmitting || !jobTitle.trim() || !requirements.trim()}
                className="gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                {isSubmitting ? 'Saving...' : 'Save Job Details'}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setActiveTab('upload')}
                disabled={!jobTitle.trim() || !requirements.trim()}
                className="gap-2"
              >
                Continue to CV Upload
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card className="border-2 border-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    CV Management
                  </CardTitle>
                  <CardDescription>
                    Upload and manage candidate CVs for review
                  </CardDescription>
                </div>
                {jobTitle && (
                  <Badge variant="outline" className="px-3 py-1">
                    Job: {jobTitle}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="cv-upload"
                  className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border-primary/20 bg-muted/30"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="size-10 mb-3 text-primary/70"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm font-medium">
                      <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOCX, or TXT (MAX. 5MB)
                    </p>
                  </div>
                  <Input
                    id="cv-upload"
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.docx,.doc,.txt"
                    onChange={handleCVUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>

              {savedCVs.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Saved CVs</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadSavedCVs}
                      className="h-8"
                    >
                      Load All Saved CVs
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {savedCVs.map((cv) => (
                      <motion.div
                        key={cv.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-2 bg-muted rounded-md hover:bg-muted/70 transition-colors"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addSavedCVToUpload(cv)}
                            className="h-8 px-2"
                          >
                            Add to List
                          </Button>
                          <span className="text-sm truncate flex-1">{cv.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(cv.url, '_blank')}
                            className="h-8 px-2"
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              const updatedSavedCVs = savedCVs.filter(c => c.id !== cv.id);
                              setSavedCVs(updatedSavedCVs);
                              localStorage.setItem(SAVED_CVS_KEY, JSON.stringify(updatedSavedCVs));
                              toast.success('CV removed from saved items');
                            }}
                            className="h-8 px-2 text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedCVs.length > 0 && (
                <div className="space-y-3">
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      Selected CVs for Analysis
                      <Badge variant="secondary">{uploadedCVs.length}</Badge>
                    </h3>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {uploadedCVs.map((cv, index) => (
                      <motion.div
                        key={`uploaded-cv-${cv.name}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-2 bg-primary/5 rounded-md border border-primary/20"
                      >
                        <span className="text-sm truncate max-w-[60%] font-medium">{cv.name}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(cv.url, '_blank')}
                            className="h-8 px-2"
                          >
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCV(index)}
                            className="h-8 px-2 text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-4">
              {!jobTitle || !requirements ? (
                <div className="text-sm text-amber-500 bg-amber-50 dark:bg-amber-950/30 p-3 rounded-md w-full">
                  Please define job requirements before starting the matching process
                </div>
              ) : null}
              <div className="flex w-full gap-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab('job')}
                  className="gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 19-7-7 7-7" />
                    <path d="M19 12H5" />
                  </svg>
                  Back to Job Details
                </Button>
                <Button
                  className="w-full gap-2"
                  onClick={startCVMatching}
                  disabled={isScreening || uploadedCVs.length === 0 || !requirements.trim() || !jobTitle.trim()}
                >
                  {isScreening ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Starting Analysis...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                      </svg>
                      Match CVs with Job Requirements
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                This will start a chat session to analyze the match between your job requirements and the uploaded CVs
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
