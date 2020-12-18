public class DE_PostInstallRemoteMonitoring {
    public static void runPostInstallScript(){
        UnitOfMeasure um1 = new UnitOfMeasure();
        um1.Name = 'Diastole (BPM)';
        um1.Type = 'Custom';
        um1.UnitCode = 'DiastoleBPM';
        insert um1;
        
        UnitOfMeasure um2 = new UnitOfMeasure();
        um2.Name = 'Systolic (BPM)';
        um2.Type = 'Custom';
        um2.UnitCode = 'SystolicBPM';
        insert um2;
        
        CodeSet cs = new CodeSet();
        cs.Name = 'BMP Code Set';
        cs.Code = 'BMPS.D.P';
        cs.IsActive = true;
        cs.IsCustomCode = true;
        insert cs;
        
        Update [SELECT Id FROM CareObservation];
    }
}