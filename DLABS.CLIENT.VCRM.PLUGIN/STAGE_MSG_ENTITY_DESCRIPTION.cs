using Dex.Trace;
using Microsoft.Xrm.Sdk;
using System;

namespace DLABS.CLIENT.VCRM.PLUGIN
{
    public class STAGE_MSG_ENTITY_DESCRIPTION : IPlugin
    {
        #region Secure/Unsecure Configuration Setup
        private string _secureConfig = null;
        private string _unsecureConfig = null;

        private ITrace _trace;

        public STAGE_MSG_ENTITY_DESCRIPTION(string unsecureConfig, string secureConfig)
        {
            _secureConfig = secureConfig;
            _unsecureConfig = unsecureConfig;
        }
        #endregion


        public void Execute(IServiceProvider serviceProvider)
        {
            ITracingService tracer = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            try
            {

                _trace = new Trace(service, this.GetType().Name)
                {
                    TracingService = tracer
                };

                Entity entity = (Entity)context.InputParameters["Target"];


                //TODO: Do stuff
            }
            catch (Exception e)
            {
                _trace.Error(e);
                //throw new InvalidPluginExecutionException(e.Message);
            }
        }
    }
}
